"use strict";

const UsersDB = require('../models/UsersDB');
const User = require('../models/User');
const bcrypt = require('bcrypt');

var usersDB = new UsersDB();

function authenticate(request, respond)
{
    var input_username = request.body.email;
    var input_password = request.body.password;

    var msg = "";

    usersDB.getUserPassword(input_username, function(error, result)
    {
        if (error)
        {
            respond.json(error);
        }
        else
        {
            if (result.length > 0)
            {
                if (comparePassword(input_password, result[0].password_hash))
                {
                    msg = "1";
                    console.log(msg);
                }
                else
                {
                    msg = "Wrong Password";
                    console.log(msg);
                }
            }
            else
            {
                msg = "User not found";
                console.log(msg);
            }

            respond.json(prepareMessage(msg));
        }
    });
}

// Used for update page, gets the details of a user and put
// into the fields for the user to edit
function getSingleUser(request, respond)
{
    usersDB.getSingleUser(request.params.username, function(error, result)
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

// Admin purposes, gets all the users
function getAllUsers(request, respond)
{
    usersDB.getAllUsers(function (error, result)
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


// Adding a new user
function addUser (request, respond)
{
    
    var input_password = hashPassword(request.body.password)
    var user = new User(request.body.username, input_password , request.body.name, request.body.address, request.body.postalCode, request.body.phoneNumber);
    
    usersDB.addUser(user, function(error, result)
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

// Update comments, only names and usernames cannot be updated
// Will retrieve previous user credentials to the form inputs first
// In the case of not changing, field will not be null.
function updateUser(request, respond)
{

    // var input_password = hashPassword(request.body.password)
    var user = new User(request.params.username, null, null, request.body.address, request.body.postalCode, request.body.phoneNumber);

    usersDB.updateUser(user, function(error, result)
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

// Delete a user based on the url username
function deleteUser(request, respond)
{

    usersDB.deleteUser(request.params.username, function(error, result)
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

// Hash password function
var hashPassword = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

var comparePassword = function(p1, p2) {

    return bcrypt.compareSync(p1, p2);
}

function prepareMessage(msg) {
    var obj = { "message": msg };

    return obj;
}

module.exports = {addUser, getAllUsers, updateUser, deleteUser, authenticate, getSingleUser, hashPassword, comparePassword};