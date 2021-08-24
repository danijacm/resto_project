const Response = require('../../../classes/response');
const {
    getExistProduct
} = require('../../../model/products');



const createNewOrder = async (req, res) => {
    const {
        info_order,
        order_detail,
    } = req.body;

    //console.log("info_order: " + JSON.stringify (info_order));
    //console.log("order_detail: " + JSON.stringify (order_detail));

    rta = new Response(true, 200, "Operacion en desarrollo viejo Gus!!!", "");
    res.status(404).send(rta);

}


module.exports = {
    createNewOrder
}