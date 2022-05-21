/**
 * Retrieve the search term from the search bar
 * and pass it as a parameter to the search results URL
 */
function getSearchTerm() {
    // Read value of search bar
    let searchbar = document.getElementById("header-search");
    // Format the value for insertion in to URL
    let param = searchbar.value.trim().replace(" ", "+");
    // Load the new url with search term parameter
    window.location.href = "http://localhost:8080/search?term=" + param;
}