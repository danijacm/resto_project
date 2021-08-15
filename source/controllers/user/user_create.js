const {
    insertNewUser,
    getDataLogin
} = require('../../../model/users');
const Response = require('../../../classes/response');


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

    console.log("request:" + email + " " + fullname + " " + phone + " " + user_address + " " + user_password + " " + user_admin);

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

    getDataLogin([email, user_password]).then(function (response) {
        console.log("Respuesta del Selct " + JSON.stringify(response));
        if(response.length == 0){
            rta = new Response(true, 403, "Usuario o clave incorercta", "");
            res.status(403).send(rta);
        }
        else{
            rta = new Response(false, 200, "usuario logueado exitosamente", "");
            res.status(200).send(rta)
        }
    }).catch((error) => {
            rta = new Response(true, 500, "Ocurrio un error con la Base de datos, por favor intentalo mas tarde", error);
            res.status(500).send(rta);
        }
    )
}



module.exports = {
    createNewUser,
    loginUser
};