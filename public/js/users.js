// This function authenticates the user.
// If user is logged in the URL changes, and their username is stored in session storage
// else an error message will show in the modal.
function login() {
    var credentials = new Object();

    var loginModal = new Modal(document.getElementById("loginModal"));

    credentials.email = document.getElementById("email").value;
    credentials.password = document.getElementById("password").value;

    var request = new XMLHttpRequest();

    request.open("POST", login_url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        response = JSON.parse(request.responseText);

        if (response.message == "1") {
            sessionStorage.setItem('email', credentials.email);
            loginModal.hide();
            window.location = "index.html?email=" + credentials.email;
        }
        else {
            document.getElementById("message").textContent = response.message;
        }
    };

    request.send(JSON.stringify(credentials));
}

function logout() {
    var response = confirm("Are you sure you want to log out?");

    if (response == true) {
        if (sessionStorage.getItem("checkedOut") != "Yes") {
            deleteCart();
        }
        sessionStorage.clear();
        window.location = "index.html";
    }
}

function addUser() {
    var registerModal = document.getElementById("registerModal");
    var user = new Object();

    user.username = document.getElementById("Regemail").value;
    user.password = document.getElementById("Regpassword").value;
    user.name = document.getElementById("Regname").value;
    user.address = document.getElementById("Regaddress").value;
    user.postalCode = document.getElementById("Regpostal").value;
    user.phoneNumber = document.getElementById("Regnumber").value;

    var addUser = new XMLHttpRequest();

    addUser.open("POST", user_url, true);

    addUser.setRequestHeader("Content-Type", "application/json");

    addUser.onload = function() {
        alert("Account has been added.");
        window.location = "index.html";
    };

    addUser.send(JSON.stringify(user));

}

// GET single user credentials based on the session storage email address
function getSingleUserCredentials() {
    if (sessionStorage.getItem('email') != null) {
        var request = new XMLHttpRequest();
        request.open("GET", user_url + "/" + sessionStorage.getItem('email'), true);

        request.onload = function () {
            userCredentials = JSON.parse(request.responseText);

        };

        request.send();
    }
    else {
        alert("A bug has been detected within the webpage, please contact administrator.")
    }
}


// This function displays the credentials in the profile modal.
function displayCredentials() {
    var profileModal = new Modal(document.getElementById("profileModal"));
    document.getElementById("uAddress").value = userCredentials[0].address;
    document.getElementById("uPostal").value = userCredentials[0].postal_code;
    document.getElementById("uNumber").value = userCredentials[0].phone_number;
    profileModal.show();
}

function updateCredentials() {
    var updateCredentials = new XMLHttpRequest();

    updateCredentials.open("PUT", user_url + "/" + sessionStorage.getItem('email'), true);

    updateCredentials.setRequestHeader("Content-Type", "application/json");
    userCredentials[0].address = document.getElementById('uAddress').value;
    userCredentials[0].postalCode = document.getElementById('uPostal').value;
    userCredentials[0].phoneNumber = document.getElementById('uNumber').value;

    updateCredentials.onload = function () {
        var updatedModal = new Modal(document.getElementById('updatedModal'))
        var profileModal = new Modal(document.getElementById('profileModal'));
        profileModal.hide();
        updatedModal.show();

        getSingleUserCredentials();

    }

    updateCredentials.send(JSON.stringify(userCredentials[0]));
}

// This function gets the login modal,
// used when non logged in user tries to add an item to cart.
function getLoginForm() {
    var loginModal = new Modal(document.getElementById("loginModal"));
    loginModal.show();
}

function showRegisterModal() {
    var loginModal = new Modal(document.getElementById("loginModal"));
    var registerModal = new Modal(document.getElementById("registerModal"));
    loginModal.hide();
    registerModal.show();
}

function reservationPrompt() {
    alert("Reservation online is currently unavailable, please call 60306011 to make a reservation.");
}