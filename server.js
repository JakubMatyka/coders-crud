// 1. One of the things here is to install mongodb and connect to database

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

//The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.

app.use(bodyParser.urlencoded({encode: true, extended: true}));

MongoClient.connect('mongodb://kmatyka:qlop01lwe@ds145790.mlab.com:45790/book', (err, database) => {
  if(err) {
    return console.error(err);
  }

  app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
  });
});

app.get('/', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html')
});

app.post('/titles', (req, res) => {
  console.log(req.body);
});