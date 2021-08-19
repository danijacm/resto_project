const express = require('express');
const router = express.Router();

const {createNewProduct} = require('../source/controllers/products/productFunctions');
const {getAllProducts} = require('../source/controllers/products/productFunctions');
const {validateUserAdmin} = require('../source/middlewares/products/productsMiddle');


router.post('/create_procuct', validateUserAdmin, createNewProduct);
router.get('/get_products', getAllProducts);

module.exports = router;


