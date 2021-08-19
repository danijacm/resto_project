const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const expressJwt = require('express-jwt');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; 

//const JWT_SECRET_KEY = "D@n13lJ0s3";


let requestLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutos
    max: 120,
    message: "Usted ha llegado al límite máximo de request por hora, por favor intente más tarde"
});

/*const generalError = (err, req, res, next) => { 

    if (!err) { 
        return next();    
    }

    //console.log(err);

    if (err.name === 'UnauthorizedError') { //no se encontró un token (lo devuelve el express-jwt)

        return res.status(401).send({error: "No se encontró un token de autorización"});
    }

    res.status(500).send({error: "Se ha producido un error inesperado"});
}*/

module.exports = function (app) {
    app.use(helmet());
    app.use(express.static('publica'));
    app.use(express.json());
    //app.use(generalError);

    app.disable('x-powered-by');
    app.use(express.json({limit: '150kb'}));
    app.use(requestLimit);

    app.use(expressJwt({
            secret: JWT_SECRET_KEY,
            algorithms: ['sha1', 'RS256', 'HS256']   
        }).unless({
            path: ["/user/create_user", "/user/user_login"]
    }));
}