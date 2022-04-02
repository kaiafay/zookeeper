const { animals } = require('./data/animals.json');
const express = require('express');
// assign express() to a variable so we can chain methods to the server
const app = express();

// function that takes req.query as an argument and filters through the animals
function filterByQuery(query, animalsArray) {
    let filteredResults = animalsArray;
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // returns a new filtered array
    return filteredResults;
};

// the get() method requires two arguments: 
// the route the client will fetch from and a callback function that executes when that route is accessed with a GET request
app.get('/api/animals', (req, res) => {
    // set animal json info to a variable
    let results = animals;
    // calls the filterByQuery() function
    if(req.query) {
        // sets results to the new filtered array returned by filterByQuery() function
        results = filterByQuery(req.query, results);
    }
    // sends json to the client
    res.json(results);
});

// tells server to listen for requests
// port numbers around 3000 are common practice
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});