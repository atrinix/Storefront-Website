/******************************************************************************
 * header.js
 * 
 * Author:  Zachary Colbert <921899547>
 * Contact: zcolbert@sfsu.edu
 * 
 * Description:
 *      Contains functions to set the overlay on the shopping cart icon
 *      when there are products in the cart.
 ******************************************************************************/


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
function setCartQuantityElement() {
    /* Set a quantity overlay onto the shopping cart icon */

    // Read the shopping cart cookie
    var cart_products = getValueOfCookie("products");

    if (cart_products) {
        // Count the number of elements in the cart
        var count = cart_products.split("|").length;

        // Count should never be zero at this point, but just in case ...
        if (count > 0) {
            // Locate the shopping cart icon
            var cart_div = document.getElementById("cart-icon");
            // Create a new element for the overlay
            var overlay = document.createElement("div");
            overlay.id = "cart-qty-overlay";
            // Set the overlay text to contain the cart quantity
            overlay.innerText = count.toString();
            // Add the overlay on top of the cart icon
            cart_div.appendChild(overlay);
        }
    }
}
window.addEventListener("load", setCartQuantityElement, true);