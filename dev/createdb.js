/********************************************************************
 * createdb.js 
 *
 * Author:  Zachary Colbert (921899547) 
 * Purpose: Helper script to initialize a new MySQL database
 *******************************************************************/


var mysql = require('mysql');
const { exit } = require('process');


// Open a connection to the database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Student1!",
});


// Connect to the database and execute a database creation command
con.connect(function(err) {
    if (err) throw err;
    con.query("CREATE DATABASE IF NOT EXISTS products", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        exit();
    });
});
