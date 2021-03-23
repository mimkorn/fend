const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);
const meaningCloudAPI = require('./meaningCloudAPI.js')

var path = require('path')

const app = express()
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
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
    let result = await meaningCloudAPI.getSentiment(req.body.body)
    res.send(result)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

