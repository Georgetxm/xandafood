"use strict";

//This is to get the connection to the database
var db = require('../db-connection'); // reference to the db-connection.js

class UsersDB
{
    getAllUsers(callback)
    {
        var sql = "SELECT * FROM xanda.users";

        db.query(sql, callback);
    }

    getUserPassword(id, callback)
    {
        var sql = "SELECT password_hash FROM xanda.users WHERE user_id = ?";
        
        db.query(sql, [id], callback);
    }
    
    getSingleUser(id, callback)
    {
        var sql = "SELECT * FROM xanda.users WHERE user_id = ?"

        db.query(sql, [id], callback);
    }

    addUser(user, callback)
    {
        var sql = "INSERT INTO xanda.users (user_id, password_hash, name, address, postal_code, phone_number) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(sql, [user.getUserId(), user.getPasswordHash(), user.getName(), user.getAddress(), user.getPostalCode(), user.getPhoneNumber()], callback);
    }

    updateUser (user, callback)
    {
        var sql = "UPDATE xanda.users SET address = ?, postal_code = ?, phone_number = ? WHERE user_id = ?";

        return db.query(sql, [user.getAddress(), user.getPostalCode(), user.getPhoneNumber(), user.getUserId()], callback);
    }

    deleteUser (id, callback)
    {
        var sql = "DELETE FROM xanda.users WHERE user_id = ?";

        db.query(sql, [id], callback);
    }
}

module.exports = UsersDB;