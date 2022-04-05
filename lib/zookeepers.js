const { type } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

// function that filters results by query 
function filterByQuery(query, zookeepers) {
    let filteredResults = zookeepers;
    if(query.age) {
        filteredResults = filteredResults.filter(
            // convert the query string to a number to perform comparison
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }
    if(query.favoriteAnimal) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        );
    }
    if(query.name) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }
    return filteredResults;
};

// function that filters by id
function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
};

// function that creates new zookeeper 
function createNewZookeeper(body, zookeepers) {
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(path.join(__dirname, '../data/zookeepers.json'), JSON.stringify({ zookeepers }, null, 2));
    return zookeeper;
};

// function that validates user's data
function validateZookeeper(zookeeper) {
    if(!zookeeper.name || typeof zookeeper.name !== 'string') {
        return false;
    } 
    if(!zookeeper.age || typeof zookeeper.age !== 'number') {
        return false;
    }
    if(!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== 'string') {
        return false;
    }
    return true;
};

// export functions
module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
};