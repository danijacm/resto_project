const express = require('express');
const router = express.Router();

const {createNewProduct} = require('../source/controllers/products/productFunctions');
const {getAllProducts} = require('../source/controllers/products/productFunctions');
const {deleteProductByID} = require('../source/controllers/products/productFunctions');
const {validateUserAdmin} = require('../source/middlewares/products/productsMiddle');
const {validateProductID} = require('../source/middlewares/products/productsMiddle');
const {updateProductData} = require('../source/controllers/products/productFunctions');
const {validateReqNewProd} = require('../source/middlewares/products/productsMiddle');

router.post('/create_procuct', validateReqNewProd, validateUserAdmin, createNewProduct);
router.get('/get_products', getAllProducts);
router.delete('/delete_product', validateUserAdmin, validateProductID, deleteProductByID);
router.put('/update_product', validateUserAdmin, validateProductID, updateProductData);

module.exports = router;


