"use strict";

var db = require('../db-connection');

class ProductsDB
{
    getAllProducts(callback)
    {
        var sql = "SELECT * FROM xanda.products";

        db.query(sql, callback);
    }

    updateProduct(product, callback)
    {
        var sql = "UPDATE xanda.products SET product_name = ?, product_category = ?, product_price = ?, product_desc = ?, product_image =? WHERE product_id = ?";
    
        return db.query(sql, [product.getProductName(), product.getProductCategory(), product.getProductPrice(), product.getProductDescription(), product.getProductImage(), product.getProductId(), callback]);
    }

    addProduct(product, callback)
    {
        var sql = "INSERT INTO xanda.products (product_name, product_category, product_price, product_desc, product_image) VALUES (?, ?, ?, ?, ?)";

        db.query(sql, [product.getProductName(), product.getProductCategory(), product.getProductPrice(), product.getProductDescription(), product.getProductImage()], callback);
    }

    deleteProduct(id, callback)
    {
        var sql = "DELETE FROM xanda.products WHERE product_id = ?";

        db.query(sql, [id], callback);
    }
}

module.exports = ProductsDB;