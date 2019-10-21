"use strict";

const ProductsDB = require('../models/ProductsDB');
const Product = require('../models/Product');

var productsDB = new ProductsDB;


function getAllProducts(request, respond)
{
    productsDB.getAllProducts (function(error, result)
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

function updateProduct(request, respond)
{
    var product = new Product(parseInt(request.params.id), request.body.productName, request.body.productCategory, request.body.productPrice, request.body.productDescription, request.body.productImage);

    productsDB.updateProduct(product, function(error, result)
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

function addProduct(request, respond)
{
    var product = new Product(null, request.body.productName, request.body.productCategory, request.body.productPrice, request.body.productDescription, request.body.productImage);

    productsDB.addProduct(product, function(error, result)
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

function deleteProduct(request, respond)
{
    productsDB.deleteProduct((parseInt(request.params.id)), function(error, result)
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


module.exports = {getAllProducts, updateProduct, addProduct, deleteProduct};