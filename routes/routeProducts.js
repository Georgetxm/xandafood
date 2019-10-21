"use strict";

const productController = require('../controllers/productController');

function routeProducts(app)
{
    app.route('/products')
        .get(productController.getAllProducts)
        .post(productController.addProduct);

    app.route('/products/:id')
        .put(productController.updateProduct)
        .delete(productController.deleteProduct);
}

module.exports = {routeProducts};