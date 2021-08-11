const Response = require('../../../classes/response');


/*const validatePk = (req, res, next){

}*/


const validateRequestUser = (req, res, next) => {
    let rta;
    let error = false

    const { email, fullname, phone, user_address, user_password, user_admin} = req.body;

    //console.log(`${email}\n ${fullname}\n ${phone}\n ${user_address}\n ${user_password}\n ${user_admin}`);
    
    if(email == null || fullname == null || phone == null || user_address == null || 
        user_password == null || user_admin == null){  
       
         error = true;   
    }
    else{
        if(email.length <= 0 || fullname.length <= 0 || phone.length <= 0 || user_address.length <=0 ||
            user_password.length <= 0 || user_admin == "" || user_admin > 1 || user_admin < 0){

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


module.exports = {validateRequestUser};
