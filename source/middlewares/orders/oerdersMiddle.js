const Response = require('../../../classes/response');
const {
    getExistProduct
} = require('../../../model/products');
const {
    getOrder,
    getPendOrderByUserId,
    getOrderStatus,
    getOrderByUserId
} = require('../../../model/orders');

const validateOrderProducts = async (req, res, next) => {
    let rta;
    let error_id = false;
    let arrayProduct = [];

    const {
        order_detail,
    } = req.body;

    for (let i = 0; i < order_detail.length; i++) {
        await getExistProduct(order_detail[i].product_id).then(function (response) {
            if (response.length === 0) {
                error_id = true;
                arrayProduct.push(`product_id: ${order_detail[i].product_id}`);
            }
        }).catch((error) => {
            rta = new Response(true, 500, "No fue posible procesar su orden", error);
            res.status(500).send(rta);
        });
    }
    if (error_id === true) {
        rta = new Response(true, 404, "La orden tiene productos que no existe o no están disponible", arrayProduct);
        res.status(404).send(rta);
    } else {
        next();
    }
}


const validateOrderRequest = async (req, res, next) => {
    let rta;
    let error = false;
    let arrayProducts = [];

    const {
        info_order,
        order_detail
    } = req.body;

    if (info_order == null || order_detail == null) {
        error = true;
    } else {
        const {
            email,
            address
        } = info_order;

        arrayProducts = order_detail;

        //console.log('arrayProducts = ' + JSON.stringify(arrayProducts));

        if (email == null || address == null || email.length <= 0 || address.length <= 0) {
            error = true;
        }

        for (let i = 0; i < arrayProducts.length; i++) {
            if (arrayProducts[i].product_id == null || arrayProducts[i].quantity == null) {
                error = true;
                break;
            }

            if (typeof (arrayProducts[i].product_id) != 'number' ||
                typeof (arrayProducts[i].quantity) != 'number') {
                error = true;
                break;
            }
        }
    }
    if (!error) {
        next();
    } else {
        rta = new Response(error, 400, "Bad request, todos los campo deben venir con datos validos", "");
        res.status(400).send(rta);
    }
}


const validateOrdeConfrRequest = (req, res, next) => {
    let rta;
    let error = false;

    const {
        user_id,
        order_id,
        payment_code
    } = req.body;

    if (user_id == null || order_id == null || payment_code == null) {
        error = true;
    }

    if (payment_code != 1 && payment_code != 2) {
        error = true;
    }

    if (typeof (user_id) != 'number' || typeof (order_id) != 'number' || typeof (payment_code) != 'number') {
        error = true;
    }

    if (!error) {
        next();
    } else {
        rta = new Response(error, 400, "Bad request, todos los campo deben venir con datos validos", "");
        res.status(400).send(rta);
    }
}


const validateOrderId = (req, res, next) => {
    let rta;

    const {
        order_id,
    } = req.body;

    getOrder(order_id).then(function (response) {
        if (response.length === 0) {
            rta = new Response(true, 404, "La orden no existe, por favor verifique");
            res.status(404).send(rta);
        } else {
            next();
        }
    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible procesar su orden", error);
        res.status(500).send(rta);
    });
}


const validateOrderUserId = (req, res, next) => {
    let rta;

    const {
        user_id,
    } = req.body;

    getPendOrderByUserId(user_id).then(function (response) {
        if (response.length === 0) {
            rta = new Response(true, 404, "El usuario no existe o no tiene una orden pendiente por confirmar");
            res.status(404).send(rta);
        } else {
            next();
        }
    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible procesar su orden", error);
        res.status(500).send(rta);
    });
}


const validateOrderStatus = (req, res, next) => {
    let rta;

    const {
        status_id
    } = req.body;

    getOrderStatus(status_id).then(function (response) {
        if (response.length <= 0) {
            rta = new Response(false, 404, `El campo status_id enviado no es válido`);
            res.status(404).send(rta);
        } else {
            next();
        }
    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible actualizar el estado de la orden", error);
        res.status(500).send(rta);
    });

}


const validateOrderOpdateReq = async (req, res, next) => {
    let rta;
    let error = false;
    let arrayProducts = [];

    const {
        user_id,
        order_id,
        status_id
    } = req.body;

    if (user_id == null || order_id == null || status_id == null) {
        error = true;
    }

    if (typeof (user_id) != 'number' || typeof (order_id) != 'number' || typeof (status_id) != 'number') {
        error = true;
    }    

    if (!error) {
        next();
    } else {
        rta = new Response(error, 400, "Bad request, todos los campo deben venir con datos validos", "");
        res.status(400).send(rta);
    }
}


const validateOrdeCanclReq = (req, res, next) => {
    let rta;
    let error = false;

    const {
        user_id,
        order_id
    } = req.body;

    if (user_id == null || order_id == null) {
        error = true;
    }

    if (typeof (user_id) != 'number' || typeof (order_id) != 'number' ) {
        error = true;
    }

    if (!error) {
        next();
    } else {
        rta = new Response(error, 400, "Bad request, todos los campo deben venir con datos validos", "");
        res.status(400).send(rta);
    }
}


const validateOrderByUser = (req, res, next) => {
    let rta;

    const {
        user_id,
        order_id
    } = req.body;

    getOrderByUserId([user_id, order_id]).then(function (response) {
        if (response.length === 0) {
            rta = new Response(true, 409, "La orden enviada no pertenece al usuario");
            res.status(409).send(rta);
        } else {
            next();
        }
    }).catch((error) => {
        rta = new Response(true, 500, "No fue posible cancelar su orden", error);
        res.status(500).send(rta);
    });
}




module.exports = {
    validateOrderProducts,
    validateOrderRequest,
    validateOrdeConfrRequest,
    validateOrderId,
    validateOrderUserId,
    validateOrderStatus,
    validateOrderOpdateReq,
    validateOrdeCanclReq,
    validateOrderByUser
}