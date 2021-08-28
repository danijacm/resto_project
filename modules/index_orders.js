const express = require('express');
const router = express.Router();

const {createNewOrder} = require('../source/controllers/orders/ordersFunctions');
const {confirmOrder} = require('../source/controllers/orders/ordersFunctions');
const {validateOrderProducts} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderRequest} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrdeConfrRequest} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderUserId} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderId} = require('../source/middlewares/orders/oerdersMiddle');
const {validateUser} = require('../source/middlewares/users/usersMiddle');




router.post('/make_order', validateUser, validateOrderRequest, validateOrderProducts, createNewOrder);
router.put('/confirm_order', validateOrderUserId, validateOrderId, validateOrdeConfrRequest, confirmOrder); 


module.exports = router;