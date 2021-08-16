const jwt = require('jsonwebtoken');
//const crypto = require('bcryptjs');
const Response = require('../../../classes/response');
const {
    insertNewUser,
    getDataLogin
} = require('../../../model/users');


const createNewUser = (req, res) => {
    let rta;
    const {
        email,
        fullname,
        phone,
        user_address,
        user_password,
        user_admin
    } = req.body;

    //console.log("request:" + email + " " + fullname + " " + phone + " " + user_address + " " + user_password + " " + user_admin);
    
    //let cryptoPass = await crypto.hash(user_password, 8);  // Cifro el password enviado por el usuario para no almacenarlo en claro en la BD
    //console.log("Clave cifrada: " + cryptoPass);


    insertNewUser([email, fullname, phone, user_address, user_password, user_admin]).then(() => {
        rta = new Response(false, 200, "usuario creado exitosamente", "");
        res.status(200).send(rta)
    }).catch((error) => {
        //validateError(error)
        rta = new Response(true, 500, "No fue posible crear el usuario", error);
        res.status(500).send(rta);
    });
}


const loginUser = (req, res) => {
    let {
        email,
        user_password
    } = req.body;

    const JWT_SECRET_KEY = "D@n13lJ0s3";

    getDataLogin([email, user_password]).then(function (response) {
        //console.log("Respuesta del Selct " + JSON.stringify(response));
        if (response.length == 0) {
            rta = new Response(true, 403, "Usuario o clave incorrecta", "");
            res.status(403).send(rta);
        } else {
            const token = jwt.sign({
                    usuario: email,
                    password: user_password
                },
                JWT_SECRET_KEY, {
                    expiresIn: '1h'
                }, {
                    algorithm: 'RS256'
                });
            rta = new Response(false, 200, "usuario logueado exitosamente", token);
            res.status(200).send(rta)
        }
    }).catch((error) => {
        rta = new Response(true, 500, "Ocurrio un error con la Base de datos, por favor intentalo mas tarde", error);
        res.status(500).send(rta);
    })
}



module.exports = {
    createNewUser,
    loginUser
};