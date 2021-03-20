const express = require('express')
const meaningCloudAPI = require('./meaningCloudAPI.js')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);

var path = require('path')

const app = express()
app.use(cors());
app.use(express.static('dist'))
app.options('*', cors())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

app.get('/test', function (req, res) {
    res.send();
})

app.post('/analyze', async function(req, res) {
    console.log("Hey, look here asdfasdf", req.body)
    console.log(req.body.data)
    res.send(meaningCloudAPI.getSentiment(req.body.data))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

