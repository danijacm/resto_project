const Response = require('../../../classes/response');
const {
    insertNewOrder,
    insertProductQuantity,
    getTotalOrderValue,
    updateOrder,
    updateOrderStatus,
    getOrderStatus,
    getOrdersByUser,
    getOrdStatAndPaymeth
} = require('../../../model/orders');


function buildOrderResponse(arrayProducts, orderID) {
    let totalPrice = 0;

    for (let i = 0; i < arrayProducts.length; i++) {
        totalPrice += arrayProducts[i].quantity * arrayProducts[i].price;
    }
    let objOrder = new Object();
    objOrder.listProducts = arrayProducts;
    objOrder.orderID = orderID;
    objOrder.totalOrder = totalPrice;
    return objOrder;
}


function getTotalOrder(arrayProducts) {
    let totalPrice = 0;

    for (let i = 0; i < arrayProducts.length; i++) {
        totalPrice += arrayProducts[i].quantity * arrayProducts[i].price;
    }
    return totalPrice;
}

const createNewOrder = (req, res) => {
    let rta;
    let order_id;
    let objOrder;
    const {
        info_order,
        order_detail,
    } = req.body;
    insertNewOrder([info_order.user_id, info_order.email, 3, info_order.address, 6]).then(function (response) {
        order_id = response[0]; //Obtengo el ID de la orden 
        for (let i = 0; i < order_detail.length; i++) {
            insertProductQuantity([order_id, order_detail[i].product_id, order_detail[i].quantity]).then(function (response) {}).catch((error) => {
                rta = new Response(true, 500, "No fue posible crear la orden", error);
                res.status(500).send(rta);
            });
        }
        getTotalOrderValue(order_id).then(function (response) {
            objOrder = buildOrderResponse(response, order_id);
            rta = new Response(false, 200, "Tu orden ha sido recibida", objOrder);
            res.status(200).send(rta)
        }).catch((error) => {
            rta = new Response(true, 500, "No fue posible crear la orden", error);
            res.status(500).send(rta);
        });
    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear la orden", error);
        res.status(500).send(rta);
    });
}



const confirmOrder = (req, res) => {
    let rta;

    const {
        order_id,
        payment_code
    } = req.body;

    updateOrder([payment_code, 1, order_id]).then(function (response) {
        //console.log("response = " + response);
        rta = new Response(false, 200, "Tu orden ha sido confimada");
        res.status(200).send(rta)

    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear la orden", error);
        res.status(500).send(rta);
    });
}


const changeOrderStatus = (req, res) => {
    let rta;

    const {
        order_id,
        status_id
    } = req.body;

    updateOrderStatus([status_id, order_id]).then(() => {

        getOrderStatus(status_id).then(function (response) {
            rta = new Response(false, 200, "El estado de la orden ha sido actualizado", response[0]);
            res.status(200).send(rta)

        }).catch((error) => {
            rta = new Response(true, 500, "No fue posible actualizar el estado de la orden", error);
            res.status(500).send(rta);
        });

    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible actualizar el estado de la orden", error);
        res.status(500).send(rta);
    });
}


//Middlewares pendientes: 
// - Validar que la orden exista para el usuario
// - Que la orden a cancelar se encuentre en un estado válido para cancelación
// - Validar que el request venga correcto 
const cancelOrder = (req, res) => {
    let rta;
    let cancel_status = 5;
    const {
        order_id
    } = req.body;

    updateOrderStatus([cancel_status, order_id]).then(() => {

        rta = new Response(false, 200, "Su orden ha sido cancelada");
        res.status(200).send(rta)

    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible cancelar la orden", error);
        res.status(500).send(rta);
    });
}



const getInfOrdersByUser = async (req, res) => {
    let rta;
    let arrayOrders = [];
    const {
        user_id,
    } = req.body;

    try {
        const response = await getOrdersByUser(user_id);
        for (let i = 0; i < response.length; i++) {
            try {
                //const response2 = await getOrdStatAndPaymeth([response[i]['status_id'], response[i]['payment_code']]);
                const response2 = await getOrdStatAndPaymeth([response[i].status_id, response[i].payment_code]);
                let objOrder = new Object();
                objOrder.order_id = response[i].order_id;
                objOrder.order_address = response[i].order_address;
                objOrder.order_status = response2[0].status_desc;
                objOrder.payment_meth = response2[0].payment_desc;
                const listProducts = await getTotalOrderValue(response[i].order_id);
                objOrder.listProducts = listProducts;
                objOrder.totalOrder = getTotalOrder(listProducts);
                arrayOrders.push(objOrder);
            } catch (error) {
                rta = new Response(true, 500, "Error consultando la Base de datos", error);
                res.status(500).send(rta);
            }
        }
        res.status(200).send(new Response(false, 200, `Las ordenes encontradas para ${response[0]['fullname']} son:`, arrayOrders))
        res.status(500).send(rta);
    } catch (error) {
        rta = new Response(true, 500, "Error consultando la Base de datos", error);
        res.status(500).send(rta);
    }
}



module.exports = {
    createNewOrder,
    confirmOrder,
    changeOrderStatus,
    cancelOrder,
    getInfOrdersByUser
}