"use strict";

const ReservationDB = require('../models/ReservationsDB');
const Reservation = require('../models/Reservation');

var reservationsDB = new ReservationDB();


function getAllReservations (request, respond)
{
    reservationsDB.getAllReservations(function(error, result)
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

function addReservation(request, respond)
{
    var reservation = new Reservation(null, request.body.email, request.body.name, request.body.phoneNumber, request.body.reservationDate, request.body.requests);
    
    reservationsDB.addReservation(reservation, function(error, result)
    {
        if(error)
        {
            respond.json(error);
        }
        else
        {
            respond.json(result);
        }
    });
}

function deleteReservation(request, respond)
{
    reservationsDB.deleteReservation(request.params.email, function(error, result)
    {
        if(error)
        {
            respond.json(error);
        }
        else
        {
            respond.json(result);
        }
    });
}

function getRecentReservation (request, respond)
{
    reservationsDB.getRecentReservation(request.params.email, function(error, result)
    {
        if(error)
        {
            respond.json(error);
        }
        else
        {
            respond.json(result);
        }
    });
}
module.exports = {addReservation, getAllReservations, deleteReservation, getRecentReservation};