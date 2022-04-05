// this file acts as a central hub for all routing functions

const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes');

// have the router use the module exported from animalRoutes.js
router.use(animalRoutes);
// have the router use the module exported from zookeeperRoutes.js
router.use(zookeeperRoutes);

// export the router
module.exports = router;