const express = require('express');
// assign express() to a variable so we can chain methods to the server
const app = express();

// tells server to listen for requests
// port numbers around 3000 are common practice
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});