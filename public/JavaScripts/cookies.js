
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