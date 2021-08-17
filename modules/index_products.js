const express = require('express');
const router = express.Router();

const {createNewProduct} = require('../source/controllers/products/productModel');
const {validateUserAdmin} = require('../source/middlewares/products/productsMiddle');


router.post('/create_procuct', validateUserAdmin, createNewProduct);

module.exports = router;
