const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  encode: true,
  extended: true
}));

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
});

app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html')
});

app.post('/titles', (req, res) => {
    console.log(req.body);
});