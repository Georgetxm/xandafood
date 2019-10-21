"use strict";

const CartItemsDB = require('../models/CartItemsDB');
const CartItem = require('../models/CartItem');

var cartItemsDB = new CartItemsDB();

// For when users add a product to their cart
// Needs a cart number, the product to add, the quantity        
function addProduct(request, respond)
{
    var cartItem = new CartItem(null, parseInt(request.params.id), request.body.productId, request.body.quantity, request.body.remarks);
    cartItemsDB.addProduct(cartItem, function(error, result)
    {
        if(error)
        {
            respond.json(error);
        }
        else
        {
            respond.json(result);
        }
    });
}

// Delete specific product from a cart
function deleteProduct(request, respond)
{
    var cartItem = new CartItem(null, parseInt(request.params.id), request.body.dProductId, null, null, null);

    cartItemsDB.removeProduct(cartItem, function(error, result)
    {
        if(error)
        {
            respond.json(error);
        }
        else
        {
            respond.json(result);
        }
    });
}

// Update specific product
function updateProduct(request, respond)
{
    var cartItem = new CartItem(null, parseInt(request.params.id), request.body.productId, request.body.quantity, request.body.remarks);


    cartItemsDB.updateProduct (cartItem, function(error, result)
    {
        if(error)
        {
            respond.json(error);
        }
        else
        {
            respond.json(result);
        }
    });
}

// function updatePrice(request, respond)
// {
//     var cartItem = new CartItem((parseInt(request.body.cartItemId)), null, null, null, null, null);

//     cartItemsDB.updatePrice(cartItem, function(error, result)
//     {
//         if(error)
//         {
//             respond.json(error);
//         }
//         else
//         {
//             respond.json(result);
//         }
//     });
// }

module.exports = {addProduct, deleteProduct, updateProduct};