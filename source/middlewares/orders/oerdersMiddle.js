const Response = require('../../../classes/response');
const {
    getExistProduct
} = require('../../../model/products');

const validateOrderProducts = async (req, res, next) => {
    let rta;
    let error_id = false;
    let arrayProduct = [];

    const {
        order_detail,
    } = req.body;

    for (let i = 0; i < order_detail.length; i++) {
        await getExistProduct(order_detail[i].product_id).then(function (response) {
            if (response.length === 0) {
                error_id = true;
                arrayProduct.push(`product_id: ${order_detail[i].product_id}`)
            }
        }).catch((error) => {
            rta = new Response(true, 500, "No fue posible procesar su orden", error);
            res.status(500).send(rta);
        });
    }
    if (error_id === true) {
        rta = new Response(true, 404, "La orden tiene productos que no existe o no están disponible", arrayProduct);
        res.status(404).send(rta);
    } else {
        next();
    }
}

module.exports = {
    validateOrderProducts
}