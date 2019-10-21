"use strict";

var db = require('../db-connection');

class CartsDB
{
    // For admin purposes, get all carts
    getAllCarts(callback)
    {
        var sql = "SELECT * FROM xanda.cart";

        db.query(sql, callback);
    }

    // Get all the carts of a user, transaction history purposes
    // After getting all carts, when users click on the cart details,
    // uses the getAllItemsInCart function below
    getAllCartsOfUser(userId, callback)
    {
        var sql = "SELECT users.user_id, cart_id FROM xanda.users, xanda.cart WHERE users.user_id = ? AND users.user_id = cart.username";

        db.query(sql, [userId], callback);
    }

    // Create cart instance based on user, will be linked to when user first clicks the 'Add to cart' button
    createCartInstance(cart, callback)
    {
        var sql = "INSERT INTO xanda.cart (username, date) VALUES (?, ?)";

        db.query(sql, [cart.getUserId(), cart.getDate()], callback);
    }

    // Get all the items in a cart, will be used to display all cart items
    // Used in checkout page.
    getAllItemsInCart(id, callback)
    {
        var sql = "SELECT cart_id, products.product_id, product_name, quantity, product_price, (products.product_price * cart_items.quantity) AS total_price, remarks FROM xanda.cart, xanda.cart_items, xanda.products WHERE cart.cart_id = ? AND cart.cart_id = cart_items.cart_number AND cart_items.product_id = products.product_id;";
    
        db.query(sql, [id], callback);
    }

    // Delete the whole cart
    deleteCart(id, callback)
    {
        var sql = "DELETE FROM xanda.cart WHERE cart_id = ?"

        db.query(sql, [id], callback);
    }
}

module.exports = CartsDB;