//const crypto = require('bcryptjs');
const Response = require('../../../classes/response');
const {
    getEmail
} = require('../../../model/users');
const {
    insertNewProduct,
    getProducts
} = require('../../../model/products');


const createNewProduct = (req, res) => {
    let rta;
    const {
        prod_name,
        product_desc,
        price,
        product_status,
    } = req.body;

    insertNewProduct([prod_name, product_desc, price, product_status]).then(function (response) {
        console.log("response: " + response);

        rta = new Response(false, 200, "Nuevo producto creado exitosamente", {
            "Producto": prod_name,
            "ID": response[0]
        });
        res.status(200).send(rta)
    }).catch((error) => {
        //validateError(error)
        rta = new Response(true, 500, "No fue posible crear el producto", error);
        res.status(500).send(rta);
    });
}


const getAllProducts = (req, res) => {
    let rta;

    const {
        email
    } = req.body;

    getEmail(email).then(function (response) {
        console.log('getEmail response: ' + JSON.stringify(response));
        if (response.length == 0) {
            rta = new Response(true, 404, `El usuario: ${email} no esta registrado en el sistema`, "");
            res.status(404).send(rta);
        }

        getProducts().then(function (response) {
            console.log("Ptoducts: " + response);
            if (response.length === 0) {
                rta = new Response(false, 204, "No existen productos disponibles", response);
                res.status(204).send(rta)
            } else {
                rta = new Response(false, 200, "Consulta de productos exitosa", response);
                res.status(200).send(rta)
            }
        }).catch((error) => {
            rta = new Response(true, 500, "No fue posible consultar los productos", error);
            res.status(500).send(rta);
        });

    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta);
    });
}


module.exports = {
    createNewProduct,
    getAllProducts
}