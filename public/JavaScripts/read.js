const PRODUCT_FILE = 'products.json';
const new_product_delimiter = '|';
const product_quantity_delimiter = ',';
const product_cookie_name = "products";
/*read.js authored by Zach Colbert and Chris Camano*/

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
function createCurrentAnimalElement() {
    /* Load animal details from a JSON file and populate 
    the on-screen elements with those details. The key for
    the desired animal is stored in the `currentanimal` cookie. */
    loadJSON(function(response) {
        // Parse JSON string into object
        var data = JSON.parse(response);
        // Retrieve current animal key from cookie
        var current_animal_key = getValueOfCookie("currentanimal");
        // Retrieve the JSON data corresponding to this key
        var animal_JSON_data = data.animal[current_animal_key];
        // Create the on-screen elements from this animal's JSON data calling respective helper functions
        createProductImage(animal_JSON_data, 0);
        createProductImage(animal_JSON_data, 1);
        createProductImage(animal_JSON_data, 2);
        createProductImage(animal_JSON_data, 3);
        createProductName(animal_JSON_data)
        createProductDescription(animal_JSON_data);
        createProductPrice(animal_JSON_data);
    });
}
function createProductPrice(animalKey) {
    //Add the animal's price to the page 
    var parent = document.getElementById("price-section"); 
    var name = document.createTextNode("$"+animalKey.price); 
    name.className = "info";
    parent.appendChild(name); 
}
function createProductName(animal_JSON){
    // Add the animal's name to the page 
    var parent = document.getElementById("name-section"); 
    var name = document.createTextNode(animal_JSON.name); 
    name.className = "info";
    parent.appendChild(name); 
}
function createProductDescription(animal_JSON) {
    // Add the animal's descriptive text to the page 
    var parent = document.getElementById("description-section"); 
    var description = document.createTextNode(animal_JSON.description); 
    description.className = "info";
    parent.appendChild(description); 
}
function createProductImage(animal_JSON, zero_based_index){
    /* Add an image to the slider element on the product page 
    Locate the slider container*/
    var slider = document.getElementById("image" + (zero_based_index + 1).toString()); 
    // Initialize the image and its attributes
    var img = document.createElement("img"); 
    // Retrieve the appropriate image path from the JSON data
    img.src = animal_JSON.images[zero_based_index]; 
    img.width = "400px";
    img.width = "400px";
    // Add the image to the slider
    slider.appendChild(img);    
}
function addItemToCart(product_key) {
    /* Add an item to the shopping cart cookie */

    // Attempt to locate the existing cart cookie
    let product_cookie_val = getValueOfCookie(product_cookie_name);
    
    if (product_cookie_val) {
        // Cookie exists. Append to its existing value
        let products = product_cookie_val.split(new_product_delimiter);

        // Check whether this product is already in the cart
        // If it exists, increment its quantity. Otherwise append it.
        let exists = false;
        for (i in products) {
            parts = products[i].split(product_quantity_delimiter);

            // If the product exists, increment its quantity
            if (parts[0].trim() == product_key) {
                exists = true;

                // Increment the quantity for this product
                let new_qty = parseInt(parts[1]) + 1;
                products[i] = product_key + product_quantity_delimiter + new_qty;
                // Update the document's cookie
                let cookie_val = products.join(new_product_delimiter);
                setValueOfCookie(product_cookie_name, cookie_val)
                break;
            }
        }
        if (!exists) {
            // Product does not exist - add with initial quantity of 1
            var parts = [getValueOfCookie(product_cookie_name), product_key + product_quantity_delimiter + "1"];
            let cookie_val = parts.join(new_product_delimiter);  // Append the new product onto the existing value
            setValueOfCookie(product_cookie_name, cookie_val);
        }
    }
    else {
        // Product section does not exist in cookie
        // Create it with this product and initial qty of 1
        let cookie_val = product_key + product_quantity_delimiter + "1";
        console.log("Creating");
        console.log(document.cookie);
        setValueOfCookie(product_cookie_name, cookie_val);
        console.log(document.cookie);
    }
    // Reload the page to update the cart quantity icon
    location.reload();
}
function setValueOfCookie(cookie_name, cookie_value) {
    /* Set the value of a cookie and append a default suffix for site-wide accessibility */
    var suffix = ["domain=localhost", "path=/", "SameSite=Strict"].join("; ");
    // Joing the cookie value with the suffix
    var cookie_val = cookie_value + "; " + suffix;
    // Set the value of the cookie
    document.cookie = cookie_name + "=" + cookie_val;
}
