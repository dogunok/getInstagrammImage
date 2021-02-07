const express = require('express');
const cors = require('cors');

const routes = require('./routes.js');
const config = require('./config.json');

const port = config.serverPort;
const app = express();


app.use(cors())
app.use(express.static('static'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
routes(app)

const server = app.listen(port, err => {
    if(err) throw console.log(`error - ${err}`)
    console.log(`Server listening on port http://localhost:${server.address().port}`);
});
