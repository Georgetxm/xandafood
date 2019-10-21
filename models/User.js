"use strict";

class User {
    constructor(userId, passwordHash, name, address, postalCode, phoneNumber) {
        this.userId = userId;
        this.passwordHash = passwordHash;
        this.name = name;
        this.address = address;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
    }

    getUserId() {
        return this.userId;
    }

    getPasswordHash() {
        return this.passwordHash;
    }

    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    getPostalCode() {
        return this.postalCode;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    setPasswordHash(passwordHash) {
        this.passwordHash = passwordHash;
    }

    setName(name) {
        this.name = name;
    }

    setAddress(address) {
        this.address = address;
    }

    setPostalCode(postalCode) {
        this.postalCode = postalCode;
    }

    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

module.exports = User;