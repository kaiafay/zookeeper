// this file acts as a central hub for all routing functions

const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

// have the router use the module exported from animalRoutes.js
router.use(animalRoutes);

// export the router
module.exports = router;