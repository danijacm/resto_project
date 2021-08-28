//const crypto = require('bcryptjs');
const Response = require('../../../classes/response');
const {
    getEmail
} = require('../../../model/users');
const {
    insertNewProduct,
    getProducts,
    getOneProduct,
    deleteProduct,
    updateProduct
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

    /*const {
        email
    } = req.body;*/

    /*getEmail(email).then(function (response) {
        console.log('getEmail response: ' + JSON.stringify(response));
        if (response.length == 0) {
            rta = new Response(true, 404, `El usuario: ${email} no esta registrado en el sistema`, "");
            res.status(404).send(rta);
        }*/
        console.log("Estoy en el controlador");
        getProducts().then(function (response) {
            //console.log("Ptoducts: " + response);
            if (response.length === 0) {
                rta = new Response(false, 404, "No existen productos disponibles", response);
                res.status(404).send(rta)
            } else {
                rta = new Response(false, 200, "Consulta de productos exitosa", response);
                res.status(200).send(rta)
            }
        }).catch((error) => {
            rta = new Response(true, 500, "No fue posible consultar los productos", error);
            res.status(500).send(rta);
        });

    /*}).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta);
    });*/
}



const deleteProductByID = (req, res) => {
    let rta;
    let prod_name;

    const {
        product_id
    } = req.body;

    getOneProduct(product_id).then(function (response) {
        console.log('Producto: ' + response);

        prod_name = response[0].prod_name;

        deleteProduct(product_id).then(function (response) {
            console.log('Producto borrado: ' + response);

            rta = new Response(true, 200, `Producto borrado exitosamente`, {
                "producto borrado": prod_name
            });
            res.status(200).send(rta);

        }).catch((error) => {
            rta = new Response(true, 500, "No fue posible borrar el producto", error);
            res.status(500).send(rta);
        });

    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible borrar el producto", error);
        res.status(500).send(rta);
    });

}


const updateProductData = (req, res) => {
    let arrayProduct = [];

    const {
        email,
        product_id,
        product_data
    } = req.body;

    //console.log("product_data = " + JSON.stringify (product_data));

    for (let key in product_data) {
        arrayProduct.push(`${key}='${product_data[key]}'`)
    }
    //console.log("arrayProduct = " + JSON.stringify (arrayProduct));

    updateProduct(product_id, arrayProduct).then(function (response) {
        //console.log('Producto: ' + JSON.stringify (response));

        rta = new Response(true, 200, `Producto actualizado exitosamente`, "");
        res.status(200).send(rta);

    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible actualizar el producto", error);
        res.status(500).send(rta);
    });
    
}


module.exports = {
    createNewProduct,
    getAllProducts,
    deleteProductByID,
    updateProductData
}