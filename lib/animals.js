const fs = require('fs');
const path = require('path');

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
        path.join(__dirname, '../data/animals.json'),
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

// export functions
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};