const express = require('express');
const router = express.Router();

const {createNewOrder} = require('../source/controllers/orders/ordersFunctions');
const {confirmOrder} = require('../source/controllers/orders/ordersFunctions');
const {changeOrderStatus} = require('../source/controllers/orders/ordersFunctions');
const {validateOrderProducts} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderRequest} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrdeConfrRequest} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderUserId} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderId} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderStatus} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderOpdateReq} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrdeCanclReq} = require('../source/middlewares/orders/oerdersMiddle');
const {validateOrderByUser} = require('../source/middlewares/orders/oerdersMiddle');
const {validateUser} = require('../source/middlewares/users/usersMiddle');
const {validateUserProfile} = require('../source/middlewares/users/usersMiddle');
const {validateUserID} = require('../source/middlewares/users/usersMiddle');
const {cancelOrder} = require('../source/controllers/orders/ordersFunctions');
const {getInfOrdersByUser} = require('../source/controllers/orders/ordersFunctions'); 


router.post('/make_order', validateUser, validateOrderRequest, validateOrderProducts, createNewOrder);
router.put('/confirm_order', validateOrderUserId, validateOrderId, validateOrdeConfrRequest, confirmOrder); 
router.put('/update_order_status', validateOrderOpdateReq, validateUserProfile, validateOrderId, validateOrderStatus, changeOrderStatus);
router.put('/cancel_order', validateOrdeCanclReq, validateUser, validateOrderId, validateOrderByUser, cancelOrder);
router.get('/get_orders', validateUserID, getInfOrdersByUser);
module.exports = router;