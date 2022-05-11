const express = require('express');
const { getAllProductsStatic, getAllProduct, addProductItem, updateProductItem, deleteProductItem } = require('../controller/products');
const productsRouter = express.Router();


productsRouter.route('/static').get(getAllProductsStatic);
productsRouter.route('/').get(getAllProduct).post(addProductItem)
productsRouter.route('/:id').patch(updateProductItem).delete(deleteProductItem)

module.exports = productsRouter;