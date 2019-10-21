"use strict";

class CartItem
{
    constructor(cartItemId, cartNumber, productId, quantity, remarks)
    {
        this.cartItemId = cartItemId;
        this.cartNumber = cartNumber;
        this.productId = productId;
        this.quantity = quantity;
        this.remarks = remarks;
    }

    getCartItemId()
    {
        return this.cartItemId;
    }

    getCartNumber()
    {
        return this.cartNumber;
    }

    getProductId()
    {
        return this.productId;
    }

    getQuantity()
    {
        return this.quantity;
    }

    getRemarks()
    {
        return this.remarks;
    }

    setCartItemId(cartItemId)
    {
        this.cartItemId = cartItemId;
    }

    setCartNumber(cartNumber)
    {
        this.cartNumber = cartNumber;
    }

    setProductId(productId)
    {
        this.productId = productId;
    }

    setQuantity(quantity)
    {
        this.quantity = quantity;
    }

    setRemarks(remarks)
    {
        this.remarks = remarks;
    }
}

module.exports = CartItem;