"use strict";

const reviewController = require('../controllers/reviewController');

function routeReviews(app)
{
    app.route('/reviews')
        .get(reviewController.getAllReviews)
        .post(reviewController.addReview);

    app.route('/reviews/:id')
        .put(reviewController.updateReview)
        .delete(reviewController.deleteReview);
        
}

module.exports = {routeReviews};