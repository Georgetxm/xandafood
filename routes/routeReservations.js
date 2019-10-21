"use strict";

const reservationController = require('../controllers/reservationController');

function routeReservations(app)
{
    app.route('/reservation')
        .get(reservationController.getAllReservations)
        .post(reservationController.addReservation);

    app.route('/reservation/:email')
        .get(reservationController.getRecentReservation)
        .delete(reservationController.deleteReservation);
}

module.exports = {routeReservations};