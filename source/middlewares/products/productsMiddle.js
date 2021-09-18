const Response = require('../../../classes/response');
const {getFieldUserAdmin} = require('../../../model/products');

const {getOneProduct} = require('../../../model/products');


const validateReqNewProd = (req, res, next) => {
    let rta;
    let error = false

    const { email, prod_name, product_desc, price, product_status } = req.body;
    
    if(email == null || prod_name == null || product_desc == null || price == null || 
        product_status == null){  
       
         error = true;   
    }
    else{
        if(email.length <= 0 || prod_name.length <= 0 || product_desc.length <= 0 ){
                error = true;
        }
        if(product_status < 0 || product_status > 1){
            error = true;
        }
    }
    if(!error){
        next();
    }
    else{
        rta = new Response(error, 400, 
            `Bad request, todos los campo deben venir con datos validos`);
            res.status(400).send(rta);
    }
}




const validateUserAdmin = (req, res, next) => {
    let rta;
    let admin;

    const { email } = req.body;

    getFieldUserAdmin(email).then( function (response){
        admin = response[0].user_admin;
        if(admin === 1){
            next();
        }
        else{
            rta = new Response(true, 409, `El usurio ${email} no tiene privilegios de administrador`, "");
            res.status(409).send(rta);    
        }
     }).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta);
    });  
}


const validateProductID = (req, res, next) => {
    let rta;

    const { product_id } = req.body;
    //console.log("product_id = " + product_id);
    getOneProduct(product_id).then( function (response){
     
        if(response.length > 0){
            next();
        }
        else{
            rta = new Response(true, 404, `El ID del producto no existe`, "");
            res.status(404).send(rta);    
        }
     }).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta);
    });  
}

module.exports = {
    validateUserAdmin,
    validateProductID,
    validateReqNewProd
};