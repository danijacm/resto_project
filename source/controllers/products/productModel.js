
//const crypto = require('bcryptjs');
const Response = require('../../../classes/response');
const {
    insertNewProduct,
} = require('../../../model/products');


const createNewProduct = (req, res) => {
    let rta;
    const {
        prod_name,
        product_desc,
        price,
        product_status,
    } = req.body;

    insertNewProduct([prod_name, product_desc, price, product_status]).then(function(response){
        console.log("response: " + response);

        rta = new Response(false, 200, "Nuevo producto creado exitosamente", {"Producto": prod_name, "ID": response[0]});
        res.status(200).send(rta)
    }).catch((error) => {
        //validateError(error)
        rta = new Response(true, 500, "No fue posible crear el producto", error);
        res.status(500).send(rta);
    });
}


module.exports = {
    createNewProduct
}