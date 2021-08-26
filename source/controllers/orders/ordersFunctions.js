const Response = require('../../../classes/response');
const {
    insertNewOrder
} = require('../../../model/orders');

const createNewOrder = async (req, res) => {
    let order_id;
    const {
        info_order,
        order_detail,
    } = req.body;

    //console.log("info_order: " + JSON.stringify (info_order));
    //console.log("order_detail: " + JSON.stringify (order_detail));
    //email, payment_code, order_address, status_id
    insertNewOrder([info_order.email, 3, info_order.address, 6]).then(function (response) {
        //console.log("response: " + response);
        order_id = response[0];
        rta = new Response(false, 200, "Nueva orden creade exitosamente", "");
        res.status(200).send(rta)
    }).catch((error) => {
        //validateError(error)
        rta = new Response(true, 500, "No fue posible crear la orden", error);
        res.status(500).send(rta);
    });

}


module.exports = {
    createNewOrder
}