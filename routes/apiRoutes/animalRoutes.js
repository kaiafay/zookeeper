// import functions from animals.js
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
// import the animals object from animals.json
const { animals } = require('../../data/animals');
// start an instance of Router
const router = require('express').Router();

// the get() method requires two arguments: 
// the route the client will fetch from and a callback function that executes when that route is accessed with a GET request
router.get('/animals', (req, res) => {
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
// a param route must come after other GET routes
router.get('/animals/:id', (req, res) => {
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
router.post('/animals', (req, res) => {
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

// export the router
module.exports = router;