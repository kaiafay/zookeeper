const { animals } = require('./data/animals.json');
const express = require('express');
// assign express() to a variable so we can chain methods to the server
const app = express();

// the get() method requires two arguments: 
// the route the client will fetch from and a callback function that executes when that route is accessed with a GET request
app.get('/api/animals', (req, res) => {
    // sends json to the client
    res.json(animals);
});

// tells server to listen for requests
// port numbers around 3000 are common practice
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});