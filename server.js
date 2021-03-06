// Setup empty JS object to act as endpoint for all routes
projectData = {};

const weatherApiKey = '55ef5fbde2c3f490371657667fe24a24';

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));


const port = 3000;

const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

app.get('/all', (req, res) => res.send(projectData));

app.post()