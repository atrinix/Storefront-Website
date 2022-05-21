/********************************************************************
 * productImport.js 
 * 
 * Author: Zachary Colbert (921899547)
 * Purpose: Helper script to import products from a JSON file into
 *          a MySQL database
 ********************************************************************/


import * as database from "./public/JavaScripts/animaldb.js";

// Load the data from the JSON file
let data = require('./public/JavaScripts/products.json');

var mysql = require('mysql');
const db = require('./schema.js');

// Open a connection to the database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Student1!",
    database: "products"
});


// Imports products from the global JSON object
function importProductData(con)
{
    for (var k in data['animal']) {
        database.insertAnimalFromJSON(con, k, data['animal'][k]);
    }
}

// Ensure that tables are created and initialized
db.initDB(con);

importProductData(con);