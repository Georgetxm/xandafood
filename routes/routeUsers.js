"use strict";

// Link to database
// Communicate with controller

const userController = require('../controllers/userController');

function routeUsers(app)
{

    app.route('/users') 
        .get(userController.getAllUsers)
        .post(userController.addUser);

    app.route('/login')
        .post(userController.authenticate);

    //Update, the URL is the unique ID primary key of each user
    app.route('/users/:username')
        .put(userController.updateUser)
        .delete(userController.deleteUser)
        .get(userController.getSingleUser);
        
}

module.exports = {routeUsers};