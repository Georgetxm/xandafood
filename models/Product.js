"use strict";

class Product
{
    constructor(productId, productName, productCategory, productPrice, productDescription, productImage)
    {
        this.productId = productId;
        this.productName = productName;
        this.productCategory = productCategory;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productImage = productImage;
    }

    getProductId()
    {   
        return this.productId;
    }

    getProductName()
    {
        return this.productName;
    }

    getProductCategory()
    {
        return this.productCategory;
    }

    getProductPrice()
    {
        return this.productPrice;
    }

    getProductDescription()
    {
        return this.productDescription;
    }

    getProductImage()
    {
        return this.productImage;
    }

    setProductId(productId)
    {
        this.productId = productId;
    }

    setProductName(productName)
    {
        this.productName = productName;
    }

    setProductCatergory(productCategory)
    {
        this.productCategory = productCategory;
    }

    setProductPrice(productPrice)
    {
        this.productPrice = productPrice;
    }

    setProductDescription(productDescription)
    {
        this.productDescription = productDescription;
    }

    setProductImage(productImage)
    {
        this.productImage = productImage;
    }

}

module.exports = Product;