"use strict";

//This is to get the connection to the database
var db = require('../db-connection'); // reference to the db-connection.js

class ReservationsDB
{
    getAllReservations(callback)
    {
        var sql = "SELECT * FROM xanda.reservation";
        db.query(sql, callback);
    }

    addReservation(reservation, callback)
    {
        var sql = "INSERT INTO xanda.reservation (email, name, phone_number, reservation_date, requests) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [reservation.getEmail(), reservation.getName(), reservation.getPhoneNumber(), reservation.getReservationDate(),  reservation.getRequests()], callback);
    }

    getRecentReservation(email, callback)
    {
        var sql = "SELECT * FROM xanda.reservation WHERE email = ? ORDER BY reservation_id DESC LIMIT 1";
        db.query(sql, [email], callback);
    }

    // Delete the most recent reservation from the entered email
    deleteReservation(email, callback)
    {
        var sql = "DELETE FROM xanda.reservation WHERE email = ? ORDER BY reservation_id DESC LIMIT 1";
        db.query(sql, [email], callback);
    }

}

module.exports = ReservationsDB;