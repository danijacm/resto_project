const express = require('express');
const router = express.Router();

const {createNewOrder} = require('../source/controllers/orders/ordersFunctions');
const {validateOrderProducts} = require('../source/middlewares/orders/oerdersMiddle');



router.post('/make_order', validateOrderProducts, createNewOrder);

module.exports = router;