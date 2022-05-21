/******************************************************************************
 * shoppingcart.js
 * 
 * Author:  Zachary Colbert <921899547>
 * Contact: zcolbert@sfsu.edu
 * 
 * Description:
 *      Contains functions for populating the shopping cart pages.
 *      Cart products are stored as keys in a cookie. 
 *      
 *      When the checkout pages are loaded, the keys are retrieved from 
 *      that cookie and used to lookup corresponding product records in 
 *      a JSON file.
 * 
 *      The JSON data is used to create and populate HTML elements in the cart.
 ******************************************************************************/

 const new_product_delimiter = '|';
 const product_quantity_delimiter = ',';
 const product_cookie_name = "products";
 
 const PRODUCT_FILE = '../JavaScripts/products.json';
 




 
 function loadJSON(callback) {
     /* Load the contents of a local JSON file. 
     Code referenced from: 
     https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
     */
     var xobj = new XMLHttpRequest();
     xobj.overrideMimeType("application/json");
     xobj.open('GET', PRODUCT_FILE, true);
     xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
             // Required use of an anonymous callback as .open will NOT 
             // return a value but simply returns undefined in asynchronous mode
             callback(xobj.responseText);
         }
     };
     xobj.send(null);
 }
 





 function updatePrice(price,priceScalar){
     console.log(price);
    var newPrice=parseFloat(price)*(priceScalar);
    newPrice=newPrice.toFixed(2);

    document.getElementById("productPrice").innerHTML="$"+newPrice;
    createTotal(newPrice);
}
function up(price,max) {
    if (document.getElementById("myNumber").value == parseInt(max)) {
        document.getElementById("myNumber").value = max;
    }
    else{
        document.getElementById("myNumber").value = parseInt(document.getElementById("myNumber").value) + 1;
        updatePrice(price,document.getElementById("myNumber").value);
    }
}
function down(price,min) {


    if (document.getElementById("myNumber").value == parseInt(min)) {
        document.getElementById("myNumber").value = min;
    }
    else{
        document.getElementById("myNumber").value = parseInt(document.getElementById("myNumber").value) - 1;
        updatePrice(price,document.getElementById("myNumber").value);
    }

}
function createQuantitySettings(animalObject,parent){
  var shell=document.createElement("div");
  let price=animalObject.price.toString().replace("$","");
  price=animalObject.price.toString().replace(",","");
  
    shell.innerHTML=' <div class="form-group"><div class="input-group"><div class="input-group-btn"><button id="down" class="quantBtn" onclick=" down('+price+',\'0\')">-</button> </div><input type="text" id="myNumber" class="form-control input-number" value="1" size="5"/><div class="input-group-btn"><button id="up" class="quantBtn" onclick="up('+price+',\'10\')">+</button></div></div>  </div>';
     
    
    shell.innerHTML=' <div class="form-group"><div class="input-group"><div class="input-group-btn"><button id="down" class="quantBtn" onclick=" down('+price+',\'0\')">-</button> </div><input type="text" id="myNumber" class="form-control input-number" value="1" size="1"/><div class="input-group-btn"><button id="up" class="quantBtn" onclick="up('+price+',\'10\')">+</button></div></div>  </div>';

    var qty = document.createElement("div");
    qty.innerHTML='<input type="number" id="number" value="0" />';
    parent.appendChild(shell);
}

 function createProductQuantity(parent, quantity) {
    parent.appendChild(qty);
}

 function removeItemFromCart(product_key) {
     /* Remove an item from the shopping cart's cookie */
     let product_cookie_value = getValueOfCookie(product_cookie_name);
 
     // If the product cookie is not empty, locate and delete the product_key
     if (product_cookie_value) {
         // Separate the individual products
         let products = product_cookie_value.split(new_product_delimiter);
 
         for (p in products) {
             // Separate the product key from the quantity
             current_key = products[p].split(product_quantity_delimiter)[0];
             // Find the key and delete it
             if (current_key == product_key) {
                 products.splice(p, 1);  // delete the item
                 // Update the document's cookie
                 setValueOfCookie(product_cookie_name, products.join(new_product_delimiter))
                 break;
             }
         }
     }
     // Reload the page to update cart contents
     location.reload();
 }
 
 function loadCartProducts() {
     /* Read the shopping cart cookie and retrieve the necessary items
     from the product JSON file so they can be populated on screen. */
 
     var product_cookie = getValueOfCookie(product_cookie_name);
     var container = document.getElementById("cart-item-section");
 
     if (product_cookie) {
         loadJSON(function(response) {
             // Parse JSON string into object
             var data = JSON.parse(response);
 
             // Extract the individual product keys from the cookie
             let products = product_cookie.split(new_product_delimiter);
             let total_price = 0.00;
 
             for (p of products) {
                 // Separate the item key and quantity
                 let parts = p.split(product_quantity_delimiter);
                 let key = parts[0];
                 let qty = parts[1];
 
                 // Load the product data corresponding to this key
                 let animal_JSON = data.animal[key];
                 // Create an element and add it to the shopping cart area
                 createCartProductElement(key, animal_JSON, container, qty);
                 // Increment the total price
                 total_price += parseFloat(animal_JSON.price.replace(",", "")) * qty;
             }
             // Display the total price on screen, rounded to two decimals
             createTotal(Math.round(total_price * 100) / 100);
         });
     }
     else {
         // No products in the shopping cart cookie
         // Display an empty cart message
         createEmptyCartElements(container);
     }
 }
 
 function createEmptyCartElements(parent) {
     /* Display a banner and a link back to the shop page. */
 
     // Create a container for the elements
     var div = document.createElement("div");
     div.id = "empty-cart-details";
     parent.appendChild(div);
 
     // Create a message notifying user of empty cart
     var banner = document.createElement("h4");
     banner.innerText = "No items in cart!";
     div.appendChild(banner);
 
     // Create a button that links to the shop page
     var link = document.createElement("a")
     link.innerText = "Shop Here";
     link.href = "../MainPages/shop.html";
     div.appendChild(link);
 
     // Hide the shipping price and total price lines
     document.getElementById("ship").style.visibility = "hidden";
     document.getElementById("total").style.visibility = "hidden";
 }
 
 function createCartProductElement(animal_key, animal_JSON_data, parent, quantity) {
     /* Create a visual representation of a product in the shopping cart.
     The product details are loaded from the animal_JSON_data structure. */
 
     // Create a container for the elements 
     var item = document.createElement("div");
     item.className = "item";
     parent.appendChild(item);
 
     // Add the elements to the container
     createProductImage(animal_JSON_data, item);
     var info = document.createElement("div");
     createRemoveButton(animal_key, item);
     item.appendChild(info);
     createProductName(animal_JSON_data, info);
     createQuantitySettings(animal_JSON_data,info)
     //createProductQuantity(info, quantity);
     createProductPrice(animal_JSON_data, info);
 }
 
 function createRemoveButton(product_key, parent) {
     /* Add a button to remove the current item from the cart */
     var elem = document.createElement("a");
     elem.href = "#";
     elem.className = "removeBtn";
     elem.innerText = 'x';
     // Set onclick to call the removeItemFromCart function on this product's key
     elem.setAttribute("onclick", "removeItemFromCart('" + product_key + "')");
     // Add button to the product element
     parent.appendChild(elem);
 }
 
 function createProductName(animal_JSON_data, parent) {
     /* Add the animal name to the product element */
     var name = document.createElement("h4");
     name.innerText = animal_JSON_data.name;
     parent.appendChild(name);
 }
 
 function createProductQuantity(parent, quantity) {
     /* Add the quantity to the product element */
     var qty = document.createElement("p");
     qty.className = "quantity";
     qty.innerText = "Quantity: " + quantity.toString();
     parent.appendChild(qty);
 }
 
 function createProductPrice(animal_JSON_data, parent) {
     /* Add the price to the product element */
     var price = document.createElement("p");
     price.className = "price";
     price.id="productPrice";
     price.innerText = "$" + animal_JSON_data.price.toString();
     parent.appendChild(price);
 }
 
 function createProductImage(animal_JSON_data, parent) {
     /* Add image to the product element */
     var img = document.createElement("img");
     // Load the first image from the animal's JSON data
     img.src = animal_JSON_data.images[0];
     // Add the image to the element
     img.className = "checkout-image";
     parent.appendChild(img);
 }
 
 function createTotal(price_amount) {
     /* Add the total price element */
     var elem = document.getElementById("total");
     elem.innerText = "TOTAL: $" + price_amount.toString();
 }
 
 function setValueOfCookie(cookie_name, cookie_value) {
     /* Set the value of a cookie and append a default string for site-wide accessibility */
     var suffix = ["domain=localhost", "path=/", "SameSite=Strict"].join("; ");
     var cookie_val = cookie_value + "; " + suffix;
     document.cookie = cookie_name + "=" + cookie_val;
 }
 
 function getValueOfCookie(cookie_key) {
     /* Returns the value of the specified cookie,
     or `undefined` if the cookie does not exist. */
     var cookies = document.cookie.split(';');
     for (c of cookies) {
         let kv = c.split('=');  // Separate key from value
         // Look for the matching key and return its value
         if (kv[0].trim() == cookie_key) {
             return kv[1];
         }
     }
 }
 window.addEventListener("load", loadCartProducts, true); 
 
