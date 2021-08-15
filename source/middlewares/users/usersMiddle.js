const Response = require('../../../classes/response');
const {getEmail} = require('../../../model/users');


const validatePk = (req, res, next) => {
    let rta;
    let data;

    const { email } = req.body;

    getEmail(email).then( function (response){
        console.log('response: ' + JSON.stringify(response));
        if(response.length == 0){
            next();
        }
        else{
            rta = new Response(true, 409, `Ya existe un usuaio registrado con este email: ${email}`, "");
            res.status(409).send(rta);    
        }
     }).catch((error) => {
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta);
    });  
}


/*validateEmailAndPassword = (req, res, next) => {

    const { email, user_password,} = req.body;

    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

}*/


const validateRequestUser = (req, res, next) => {
    let rta;
    let error = false

    const { email, fullname, phone, user_address, user_password, user_admin} = req.body;

    console.log(`${email}\n ${fullname}\n ${phone}\n ${user_address}\n ${user_password}\n ${user_admin}`);
    
    if(email == null || fullname == null || phone == null || user_address == null || 
        user_password == null || user_admin == null){  
       
         error = true;   
    }
    else{
        if(email.length <= 0 || fullname.length <= 0 || phone.length <= 0 || user_address.length <=0 ||
            user_password.length <= 0 /*|| user_admin == "" || user_admin > 1 || user_admin < 0*/){

                error = true;
        }
    }
    if(!error){
        next();
    }
    else{
        rta = new Response(error, 400, 
            `Bad request, todos los campo deben venir con datos validos {email, fullname, phone, user_address, user_password, user_admin}`);
            res.status(400).send(rta);
    }
}


const validateRequestLogin = (req, res, next) => {
    let rta;
    let error = false

    const { email, user_password} = req.body;

    //console.log(`${email}\n  ${user_password}\n`);
    
    if(email == null || user_password == null){  
       
         error = true;   
    }
    else{
        if(email.length <= 0 || user_password.length <= 0){

                error = true;
        }
    }
    if(!error){
        next();
    }
    else{
        rta = new Response(error, 400, 
            `Bad request, todos los campo deben venir con datos validos {email, user_password}`);
            res.status(400).send(rta);
    }
}



module.exports = {
    validateRequestUser,
    validatePk,
    validateRequestLogin
};
