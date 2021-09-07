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


function buildOrderResponse(arrayProducts) {
    let totalPrice = 0;

    for (let i = 0; i < arrayProducts.length; i++) {
        totalPrice += arrayProducts[i].quantity * arrayProducts[i].price;
    }
    let objOrder = new Object();
    objOrder.listProducts = arrayProducts;
    objOrder.totalOrder = totalPrice;
    return objOrder;
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
            objOrder = buildOrderResponse(response);
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
        rta = new Response(false, 200, "Tu orden ha sido confimarda");
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



/*function searchOrderDesc (ord_status, paym_code){
    
    getOrdStatAndPaymeth([ord_status, paym_code]).then(function (response) {

        return response;

    }).catch((error) => {
        rta = new Response(true, 500, "No consultar datos de la orden", error);
        res.status(500).send(rta);
    });
}*/


/*const getInfOrdersByUser = async (req, res) => {
    let rta;
    let objOrder = new Object();
    let arrayOrders = [];
    const {
        user_id,
    } = req.body;
    
    getOrdersByUser(user_id).then(function (response) {
        //console.log("response = " + response);
         //objOrder.nameUser = response[i].fullname;
        for (let i = 0; i < response.length; i++) {
            objOrder.order_address = response[i].order_address;
            await getOrdStatAndPaymeth([response[i].status_id, response[i].payment_code]).then(function (response2) {
                //console.log('response2 = ' + response2);
                objOrder.status = response2[0].status_desc;
                objOrder.payment_meth = response2[0].payment_desc;
                arrayOrders.push(objOrder);  
            }).catch((error) => {
                rta = new Response(true, 500, "No fue posible consultar datos de la orden", error);
                res.status(500).send(rta);
            });
        }   
        
        rta = new Response(false, 200, `Las ordenes encontradas para ${response[0].fullname}`, arrayOrders);
        res.status(200).send(rta); 

    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear la orden", error);
        res.status(500).send(rta);
    });
}*/




const getInfOrdersByUser = async (req, res) => {
    let rta;
    let arrayOrders = [];
    const {
        user_id,
    } = req.body;
    
    try {
        const response = await getOrdersByUser(user_id); // myCar['make']  = 'Ford';
        console.log("response: " + JSON.stringify (response));
       // console.log("Name: " + response[0]['fullname']);  

        for (let i = 0; i < response.length; i++) {
            try {
                const response2 = await getOrdStatAndPaymeth([ response[i]['status_id'], response[i]['payment_code'] ]);
                let objOrder = new Object();
                objOrder.order_status = response2[0].status_desc;
                objOrder.payment_meth = response2[0].payment_desc;
                //console.log("i = " + i);
                //arrayOrders.push(response2[0]); 
                arrayOrders.push(objOrder); 
            } catch (error) {
                rta = new Response(true, 500, "Error consultando la Base de datos", error);
                res.status(500).send(rta);
            }
        }
        res.status(200).send(new Response(false, 200, `Órdenes en curso del usuario: ${response[0]['fullname']}`, arrayOrders))
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