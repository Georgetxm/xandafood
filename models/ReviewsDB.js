"use strict";

//This is to get the connection to the database
var db = require('../db-connection'); // reference to the db-connection.js

class ReviewsDB
{
    // Get all the reviews
    getAllReviews(callback)
    {
        var sql = "SELECT * FROM xanda.reviews";

        db.query(sql, callback);
    }

    // Add a review
    addReview(review, callback)
    {
        var sql = "INSERT INTO xanda.reviews (user_id, comment, date_posted) VALUES (?, ?, ?)";
        db.query(sql, [review.getUserId(), review.getComment(),review.getDatePosted()], callback);
    }

    // Updating review, only comments, and ratings can be changed.
    // the date will be updated as per timing the updated review was sent.
    updateReview (review, callback)
    {
        var sql = "UPDATE xanda.reviews SET comment = ?, date_posted = ? WHERE review_id = ? AND user_id = ?";

        return db.query(sql, [review.getComment(), review.getDatePosted(), review.getId(), review.getUserId()], callback);
    }

    deleteReview (id, callback)
    {
        var sql = "DELETE FROM xanda.reviews WHERE review_id = ?";

        db.query(sql, [id], callback);
    }
}

module.exports = ReviewsDB;