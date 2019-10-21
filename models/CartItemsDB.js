"use strict";

var db = require('../db-connection');

class CartItemsDB
{
    // For when users add a product to their cart
    addProduct(cartItem, callback)
    {
        var sql = "INSERT INTO xanda.cart_items (cart_number, product_id, quantity, remarks) VALUES (?, ?, ?, ?)";
        
        db.query(sql, [cartItem.getCartNumber(), cartItem.getProductId(), cartItem.getQuantity(), cartItem.getRemarks()], callback);

    }

    // Delete specific product from a cart, requires the product id and the cart of the user
    removeProduct(cartItem, callback)
    {
        var sql = "DELETE FROM xanda.cart_items WHERE product_id = ? AND cart_number = ?";

        db.query(sql, [cartItem.getProductId(), cartItem.getCartNumber()], callback);
    }

    // Update quantity, and remarks of a product, 
    updateProduct(cartItem, callback)
    {
        var sql = "UPDATE xanda.cart_items SET quantity = ?, remarks = ? WHERE product_id = ? AND cart_number = ?";


        db.query(sql, [cartItem.getQuantity(), cartItem.getRemarks(), cartItem.getProductId(), cartItem.getCartNumber(), cartItem.getCartItemId()], callback);
    
    }

    // updatePrice(cartItem, callback)
    // {
    //     var sql = "UPDATE xanda.cart_items AS ci INNER JOIN xanda.products AS p ON p.product_id = ci.product_id SET total_price = (p.product_price*ci.quantity) WHERE ci.cart_items_id = ?";

    //     db.query(sql, [cartItem.getCartItemId()], callback);
    // }
}

module.exports = CartItemsDB;