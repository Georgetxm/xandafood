"use strict";

class Review
{
    constructor(id, userId, comment, datePosted)
    {
        this.id = id;
        this.userId = userId;
        this.comment = comment;
        this.datePosted = datePosted;
    }

    getId(){
        return this.id;
    }

    getUserId(){
        return this.userId;
    }

    getComment(){
        return this.comment;
    }

    getDatePosted()
    {
        return this.datePosted;
    }

    setUserId(userId)
    {
        this.userId = userId;
    }

    setComment(comment)
    {
        this.comment = comment;
    }
    
    setDatePosted(datePosted)
    {
        this.datePosted = datePosted;
    }
}

module.exports = Review;