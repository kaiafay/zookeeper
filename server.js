const { animals } = require('./data/animals');
const express = require('express');
// use the port provided by heroku or default set to 3001
const PORT = process.env.PORT || 80;
// assign express() to a variable so we can chain methods to the server
const app = express();

// function that takes req.query as an argument and filters through the animals
function filterByQuery(query, animalsArray) {
    // set personalityTraitsArray to an empty array
    let personalityTraitsArray = [];
    // set filteredResults variable to animalsArray
    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        // save personalityTraits as a dedicated array
        // if personalityTraits is a string, place it into a new array and save
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        // loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // filter through each animal result to check for chosen trait
            // set filteredResults to new array of results containing animals with the chosen trait
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }
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

// function that finds an animal by id
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
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

// separate get() method to search for one animal at a time
// a param route must come after other GET routs
app.get('/api/animals/:id', (req, res) => {
    // set result variable to findById() function result
    const result = findById(req.params.id, animals);
    // returns result if there is one. otherwise, sends 404 error
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

// tells server to listen for requests
// port numbers around 3000 are common practice
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});