var express = require('express');
const schema = require('./dev/schema');
const db = require('./public/JavaScripts/animaldb.js');

var app = express();
app.set('view engine', 'jade');

var path = require ('path');
// Set the home page to be served on initial site access
var options = {
    index: "MainPages/index.html"
}

app.use(express.static('public', options));

var mysql = require('mysql');


// Connect to the database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Student1!",
    database: "products"
});


// Define route for accesing the animal page with an animal variable
app.get('/animalpage?:animal', function(req, res) {
    db.readAnimalByKey(con, req.query.animal, function(animal) {
        res.render('layout', {title: 'Illegal Animals - Shop', animal: animal});
    });
});
// Define route for accessing the shop page
app.get('/shop', function(req, res) {
    db.readAllAnimals(con, function(animals) {
        res.render('shopLayout', {title: 'Illegal Animals - Shop', animal: animals});
    });
});
// Define route for accessing the search page with a search term parameter
app.get('/search?:term', function(req, res) {
    let terms = req.query.term.split(' ');
    db.readAnimalsBySearchTerm(con, terms, function(animals) {
        res.render('search', {title: 'Illegal Animals - Search', animals: animals, term: terms.join(' ')});
    });
});


// Initialize database tables
schema.initDB(con);

// Start the server 
app.listen(8080);
