function addToCart() {

    var cartItems = new Object();
    // cartItems.id = sessionStorage.getItem("cartNumber");
    cartItems.productId = document.getElementById("productId").textContent;
    cartItems.quantity = document.getElementById("quantity").value;
    cartItems.remarks = document.getElementById("remarks").value;

    var addCartItem = new XMLHttpRequest();

    addCartItem.open("POST", cart_url + "/" + sessionStorage.getItem("cartNumber"), true);

    addCartItem.setRequestHeader("Content-Type", "application/json");

    addCartItem.onload = function () {
        var orderModal = new Modal(document.getElementById("orderModal"));
        var addedModal = new Modal(document.getElementById("addedModal"));
        orderModal.hide();
        addedModal.show();
    }

    addCartItem.send(JSON.stringify(cartItems));

}

function getCartItems() {
    var request = new XMLHttpRequest();
    request.open("GET", cart_url + "/" + sessionStorage.getItem("cartNumber"), true);

    request.onload = function() {
        cartItems_array = JSON.parse(request.responseText);
        displayCartItems();
    };

    request.send();
}

function displayCartItems() {
    var table = document.getElementById("cartItemsTable");
    var checkoutModal = new Modal(document.getElementById('checkoutModal'));
    totalCartItems = cartItems_array.length;
    var sumTotalPrice = 0;

    table.innerHTML="";
    for (var count = 0; count < totalCartItems; count ++) {
        

        var productName = cartItems_array[count].product_name;
        var productPrice = cartItems_array[count].product_price;
        var totalPrice = cartItems_array[count].total_price;
        var quantity = cartItems_array[count].quantity;
        var remarks = cartItems_array[count].remarks;
        var productId = cartItems_array[count].product_id;


        var cell = '<tr> \
            <td class="col-sm-8 col-md-6">\
                <div class="media-body">\
                    <h4 >\
                        '+ productName +'\
                    </h4>\
                    <div class="form-group">\
                        <label for="cRemarks">Remarks</label>\
                        <input type="text" class="form-control input-lg" value= "'+ remarks +'" readonly name="cRemarks">\
                    </div>\
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#baka" data-dismiss="modal" item="' + productId + '" onClick="getUpdateModal(this)">\
                    <span class="fa fa-pencil-alt"></span> Edit\
                    </button>\
                    <div>\
                    </div>\
                </div>\
            </td>\
            <td class="col-sm-1 col-md-1" style="text-align: center">\
                <input type="number" class="form-control" readonly item="' + productId + '" value="' + quantity + '">\
            </td>\
            <td class="col-sm-1 col-md-1 text-center">\
                <p>$' + productPrice + '</p>\
            </td>\
            <td class="col-sm-1 col-md-1 text-center">\
                <p id="totalPrice' + count + '">$' + totalPrice + '</p>\
            </td>\
            <td class="col-sm-1 col-md-1">\
                <button type="button" class="btn btn-danger" item="' + productId + '" onClick="deleteFromCart(this)">\
                    <span class="fa fa-remove"></span> Remove\
                </button>\
            </td>\
        </tr>';

    sumTotalPrice = parseInt(totalPrice) + sumTotalPrice;
    document.getElementById('subTotal').textContent = sumTotalPrice.toString();
    document.getElementById('totalCost').textContent = (sumTotalPrice + 3).toString();
        table.insertAdjacentHTML('afterbegin', cell);
    }
    
    checkoutModal.show();

}

function getUpdateModal(element) {

    console.log(document.getElementById("baka"));
    var item = element.getAttribute("item");
    var realItem = 0;
    for (var i = 0; i < products_array.length; i++) {
        if (products_array[i].product_id == item) {
            console.log(products_array[i].product_id);
            realItem = i;
            break;
        }
    };

    currentIndex = item;
    document.getElementById("UproductId").textContent = products_array[realItem].product_id;
    console.log(products_array[realItem].product_id);
    console.log(document.getElementById("UproductId").textContent);
    document.getElementById("UproductName").textContent = products_array[realItem].product_name;
    document.getElementById("UproductImage").src = products_array[realItem].product_image;
    document.getElementById("UproductDescription").textContent = products_array[realItem].product_desc;
    // document.getElementById("UproductPrice").textContent = products_array[realItem].product_price;
    // document.getElementById("Uremarks").value = products_array[realItem].remarks;
    // document.getElementById("Uquantity").value = products_array[realItem].quantity;
    console.log(products_array[realItem].product_price);
    console.log(products_array)

}

function updateCartItem(element) {
    
    var modal123 = new Modal(document.getElementById('baka'));
    var updatedProduct = new Object();

    updatedProduct.productId = document.getElementById("UproductId").textContent;
    updatedProduct.quantity = document.getElementById("Uquantity").value;
    updatedProduct.remarks = document.getElementById("Uremarks").value;

    modal123.hide();
    var updateProduct = new XMLHttpRequest();

    updateProduct.open("PUT", cart_url + "/" + sessionStorage.getItem("cartNumber"), true);
    updateProduct.setRequestHeader("Content-Type", "application/json");
    
    updatedProduct.onload = function() {
        
        modal123.hide();
        alert("Item has been updated");
        
    };

    updateProduct.send(JSON.stringify(updatedProduct));
    
}

function deleteFromCart(element) {

    var response = confirm("Are you sure you want to remove this item?");

    if (response == true) {
        var item = element.getAttribute("item");
        var deletedProduct = new Object();

        deletedProduct.dProductId = item;


        var deleteProduct = new XMLHttpRequest();

        deleteProduct.open("DELETE", cart_url + "/" + sessionStorage.getItem("cartNumber"), true);
        deleteProduct.setRequestHeader("Content-Type", "application/json");

        deleteProduct.onload = function() {
            // checkoutModal.hide();
            getCartItems();
        };

        
    }
    
    deleteProduct.send(JSON.stringify(deletedProduct));
}

function createCart(callback) {
    var orderModal = new Modal(document.getElementById("orderModal"));
    var cart = new Object();

    cart.username = sessionStorage.getItem("email");
    cart.datePosted = null;

    var createCart = new XMLHttpRequest();

    createCart.open("POST", cart_url, true);

    createCart.setRequestHeader("Content-Type", "application/json");

    createCart.send(JSON.stringify(cart));

    console.log(JSON.stringify(cart));

    callback();
}

function getMostRecentCart() {
    var request = new XMLHttpRequest();

    request.open("GET", "/" + sessionStorage.getItem("email") + cart_url + "/", true);

    request.onload = function () {
        userCart_array = JSON.parse(request.responseText);
        sessionStorage.setItem("cartNumber", userCart_array[userCart_array.length - 1].cart_id);
    };

    request.send();
}

function deleteCart() {
    var request= new XMLHttpRequest();

    request.open("DELETE", "/" + sessionStorage.getItem("cartNumber") + cart_url);

    request.send();
}

function checkedOut() {
    var checkoutModal = new Modal (document.getElementById("checkoutModal"));
    var confirmationModal = new Modal (document.getElementById("confirmationModal"));
    checkoutModal.hide();
    sessionStorage.setItem("checkedOut", "Yes");
    document.getElementById("receiptNumber").value = sessionStorage.getItem("cartNumber");
    confirmationModal.show();

}