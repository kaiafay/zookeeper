const router = require('express').Router();
const path = require('path');

// the "/" route points to the root route of the server
// this creates a homepage for the server
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// set route to animals page
// a route that has the term api will deal with transference of JSON data
// a route like "/animals" serves an HTML page
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

// set route to zookeepers page
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// catch invalid requests
// the asterik defines any route that isn't previously defined
// this route should always be last. otherwise it'll take precedence over named routes
router.get('*', (req, res) => {
    // direct the user back to the homepage
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// export the router
module.exports = router;