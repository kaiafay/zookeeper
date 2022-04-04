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

// function that creates new animal object 
function createNewAnimal(body, animalsArray) {
    // set body to animal variable
    const animal = body;
    // push animal data to the animalsArray
    animalsArray.push(animal);

    // write data to animals.json file
    fs.writeFileSync(
        // __dirname represents the directory of the file we execute the code in
        path.join(__dirname, './data/animals.json'),
        // saves the JavaScript array data as JSON
        // the null argument makes sure we don't edit any existing data
        // the 2 indicates the creation of whitespace to make the values more readable
        JSON.stringify({ animals: animalsArray}, null, 2)
    );

    // return finished code to post route for response 
    return animal;
};

// validates user data
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
      }
      if (!animal.species || typeof animal.species !== 'string') {
        return false;
      }
      if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
      }
      if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
      }
      return true;
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

// tells server to listen for POST requests
// POST requests represent the action of a client requesting the server to accept data
app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)) {
        // res.status().send() is a response method to relay a message to the client making the request
        // any error in the 400 range means that it's a user error
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // set animal variable to createNewAnimal() function result
        const animal = createNewAnimal(req.body, animals);
        // send json
        res.json(animal);
    }
});

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

// tells server to listen for requests
// port numbers around 3000 are common practice
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});