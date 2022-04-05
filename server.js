const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
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
// tells the server to use the router in apiRoutes 
app.use('./api', apiRoutes);
// tells the server to return our HTML routes
app.use('/', htmlRoutes);
// make public files readily available
app.use(express.static('public'));

// tells server to listen for requests
// port numbers around 3000 are common practice
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});