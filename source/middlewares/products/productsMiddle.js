const Response = require('../../../classes/response');
const {getFieldUserAdmin} = require('../../../model/products');


const validateUserAdmin = (req, res, next) => {
    let rta;
    let admin;

    const { email } = req.body;

    getFieldUserAdmin(email).then( function (response){
        console.log('response: ' + JSON.stringify(response));
        admin = response[0].user_admin;
        console.log('Admin: ' + admin);
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

module.exports = {
    validateUserAdmin
};