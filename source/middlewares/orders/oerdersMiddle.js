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
                arrayProduct.push(`product_id: ${order_detail[i].product_id}`);
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


const validateOrderRequest = async (req, res, next) => {
    let rta;
    let error = false;
    let arrayProducts = [];

    const {
        info_order,
        order_detail
    } = req.body;

    if( info_order == null || order_detail == null ){  
       
        error = true;   
    }
    else{
        const{
            email,
            address
        } = info_order;

        arrayProducts = order_detail;

        //console.log('arrayProducts = ' + JSON.stringify(arrayProducts));

        if(email == null || address == null || email.length <= 0 || address.length <=0 ){
            error = true;
        }

        for (let i = 0; i < arrayProducts.length; i++) {
            if(arrayProducts[i].product_id == null || arrayProducts[i].quantity == null){
                error = true;
                break;
            }

            if( typeof(arrayProducts[i].product_id) != 'number' || 
                typeof(arrayProducts[i].quantity) != 'number' ){
                    error = true;
                    break;
            }    
        }
    }
    if(!error){
        next();
    }
    else{
        rta = new Response(error, 400,"Bad request, todos los campo deben venir con datos validos", "");
            res.status(400).send(rta);
    }
}


module.exports = {
    validateOrderProducts,
    validateOrderRequest
}