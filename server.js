const fs = require('fs');
// path is a built-in module that provides utilities for working with file and directory paths
const path = require('path');
const { animals } = require('./data/animals');
const express = require('express');
// use the port provided by heroku or default set to 3001
const PORT = process.env.PORT || 3001;
// assign express() to a variable so we can chain methods to the server
const app = express();
// parse incoming string or array data
// the "extended: true" option informs our server that there may be subarray data nested 
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data into the req.body
app.use(express.json());
// make public files readily available
app.use(express.static('public'));

// the "/" route points to the root route of the server
// this creates a homepage for the server
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// set route to animals page
// a route that has the term api will deal with transference of JSON data
// a route like "/animals" serves an HTML page
app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

// set route to zookeepers page
app.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// catch invalid requests
// the asterik defines any route that isn't previously defined
// this route should always be last. otherwise it'll take precedence over named routes
app.get('*', (req, res) => {
    // direct the user back to the homepage
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// tells server to listen for requests
// port numbers around 3000 are common practice
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});