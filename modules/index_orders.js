const express = require('express');
const router = express.Router();

const {createNewOrder} = require('../source/controllers/orders/ordersFunctions');
const {validateOrderProducts} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderRequest} = require('../source/middlewares/orders/oerdersMiddle');
const {validateUser} = require('../source/middlewares/users/usersMiddle');



router.post('/make_order', validateUser, validateOrderRequest, validateOrderProducts, createNewOrder);

module.exports = router;