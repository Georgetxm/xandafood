
"use strict";

class Reservation
{
    constructor(reservationId, email, name, phoneNumber, reservationDate, requests)
    {
        this.reservationId = reservationId;
        this.email = email;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.reservationDate = reservationDate;
        this.requests = requests;
    }

    getReservationId() {
        return this.reservationId;
    }

    getEmail() {
        return this.email;
    }

    getName() {
        return this.name;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    getReservationDate() {
        return this.reservationDate;
    }

    getRequests() {
        return this.requests;
    }

    setReservationId(reservationId) {
        this.reservationId = reservationId;
    }

    setEmail(email) {
        this.email = email;
    }

    setName(name) {
        this.name = name;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    setReservationDate(reservationDate) {
        this.reservationDate = reservationDate;
    }

    setRequests(requests) {
        this.requests = requests;
    }
}

module.exports = Reservation;