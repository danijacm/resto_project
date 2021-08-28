const Response = require('../../../classes/response');
const {
    insertNewOrder,
    insertProductQuantity,
    getTotalOrderValue,
    updateOrder
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
            insertProductQuantity([order_id, order_detail[i].product_id, order_detail[i].quantity]).then(function (response) {
            }).catch((error) => { 
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
        rta = new Response(false, 200, "Tu orden ha sido confimarda", "");
        res.status(200).send(rta)

    }).catch((error) => { 
        rta = new Response(true, 500, "No fue posible crear la orden", error);
        res.status(500).send(rta);
    });
}


module.exports = {
    createNewOrder, 
    confirmOrder
}