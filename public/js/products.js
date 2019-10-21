function getProductsData()
{
    var request = new XMLHttpRequest();
    request.open("GET", product_url, true);

    request.onload = function()
    {
        products_array = JSON.parse(request.responseText);
        displayProducts(category);
    };

    request.send();
}

function displayProducts (category)
{
    var table = document.getElementById(category.concat("Table"))
    var productCount = 0;

    table.innerHTML = "";
    var totalProducts = products_array.length;

    for (var count = 0; count < totalProducts; count ++)
    {
        if (products_array[count].product_category === category)
        {
            var productImage = products_array[count].product_image;
            var productName = products_array[count].product_name;
            var productPrice = products_array[count].product_price;

            var cell = '<div class="col-md-4" style="float: none; margin: 0 auto;">                                                                                                                                                                                 \
                                <img src=' + productImage + ' item = "' + count + '" class= "img-responsive img-pointer" onClick= "orderDetails(this)" style="width:100%" alt=' + productName + '>\
                                <p>' + productName + ' <br> $' + productPrice + '</p> \                                                                                                                                                                                                           \
                        </div>';
                        
            table.insertAdjacentHTML('beforeend', cell);
            productCount ++;
        }
    }
}

function displayDesserts()
{
    category = "Desserts";
    displayProducts(category);
    document.getElementById("mainsMenu").classList.remove("active");
    document.getElementById("dessertsMenu").classList.add("active");
    document.getElementById("drinksMenu").classList.remove("active");
    document.getElementById("mainsTabs").classList.remove("active");
    document.getElementById("dessertsTabs").classList.add("active");
    document.getElementById("drinksTabs").classList.remove("active");
}

function displayDrinks()
{
    category = "Drinks";
    displayProducts(category);
    document.getElementById("mainsMenu").classList.remove("active");
    document.getElementById("dessertsMenu").classList.remove("active");
    document.getElementById("drinksMenu").classList.add("active");
    document.getElementById("mainsTabs").classList.remove("active");
    document.getElementById("dessertsTabs").classList.remove("active");
    document.getElementById("drinksTabs").classList.add("active");
}

function displayMains()
{
    category = "Mains";
    displayProducts(category);
    document.getElementById("mainsMenu").classList.add("active");
    document.getElementById("dessertsMenu").classList.remove("active");
    document.getElementById("drinksMenu").classList.remove("active");
    document.getElementById("mainsTabs").classList.add("active");
    document.getElementById("dessertsTabs").classList.remove("active");
    document.getElementById("drinksTabs").classList.remove("active");
}

function orderDetails(element)
{
    if (sessionStorage.getItem('email') != null){
    
        var item = element.getAttribute("item");
        
            var orderModal = new Modal(document.getElementById("orderModal"));
        
            currentIndex = item;
            document.getElementById("productId").textContent = products_array[item].product_id;
            document.getElementById("productName").textContent = products_array[item].product_name;
            document.getElementById("productImage").src = products_array[item].product_image;
            document.getElementById("productDescription").textContent = products_array[item].product_desc;
            document.getElementById("productPrice").textContent = products_array[item].product_price;
            document.getElementById("remarks").value = null;
            document.getElementById("quantity").value = 1;
            orderModal.show();
    }
    else{
        getLoginForm();
    }
    

    
}