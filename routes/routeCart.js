"use strict";

const cartController = require('../controllers/cartController');
const cartItemController = require('../controllers/cartItemController');

function routeCart(app)
{
    app.route('/carts')
        .get(cartController.getAllCarts)
        .post(cartController.createCartInstance);

    app.route('/:username/carts')
        .get(cartController.getAllCartsOfUser);
    
    app.route('/carts/:id')    
        .post(cartItemController.addProduct)
        .delete(cartItemController.deleteProduct)
        .get(cartController.getAllItemsInCart)
        .put(cartItemController.updateProduct);

    app.route('/:id/carts')
        .delete(cartController.deleteCart);


}

module.exports = {routeCart};