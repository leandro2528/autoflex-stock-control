const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/', productController.createProduct);

//Rota GET
router.get('/', productController.getProducts);

module.exports = router;