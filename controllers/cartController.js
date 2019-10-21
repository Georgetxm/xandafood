"use strict";

const CartsDB = require('../models/CartsDB');
const Cart = require('../models/Cart');

var cartsDB = new CartsDB();

// For admin purposes, get all carts
function getAllCarts (request, respond)
{
    cartsDB.getAllCarts(function(error, result)
    {
        if (error)
        {
            respond.json(error);
        } 
        else
        {
            respond.json(result);
        }
    });
}

// Create cart instance based on user, will be linked to when user first clicks the 'Add to cart' button
function createCartInstance (request, respond)
{
    var now = Date();
    var cart = new Cart(null, request.body.username, now.toString());

    cartsDB.createCartInstance(cart, function(error, result)
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

// Get all the items in a cart, will be used to display all cart items
// Used in checkout page.
function getAllItemsInCart (request, respond)
{
    cartsDB.getAllItemsInCart((parseInt(request.params.id)), function(error, result)
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

// Get all carts of a user
function getAllCartsOfUser (request, respond)
{
    cartsDB.getAllCartsOfUser(request.params.username, function(error, result)
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

function deleteCart (request, respond)
{
    cartsDB.deleteCart(request.params.id, function(error, result)
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

module.exports = {getAllCarts, createCartInstance, getAllItemsInCart, getAllCartsOfUser, deleteCart};