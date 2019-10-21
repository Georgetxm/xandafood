"use strict";

class Cart
{
    constructor(id, userId, date)
    {
        this.id = id;
        this.userId = userId;
        this.date = date;
    }

    getId(){
        return this.id;
    }

    getUserId()
    {
        return this.userId;
    }

    getDate(){
        return this.date;
    }

    setId(id){
        this.id = id;
    }

    setUserId(userId){
        this.userId = userId;
    }

    setDate(date){
        this.date = date;
    }
}

module.exports = Cart;