const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
let db;

const app = express();
const port = 3000;

const url ='mongodb://kmatyka:qlop01lwe@ds145790.mlab.com:45790/book';

app.use(bodyParser.urlencoded({
  encode: true,
  extended: true
}));

MongoClient.connect(url, (err, res) => {
  if (err) return console.info(err);
  db = res;
  app.listen(port, () => {
    console.info(`Server is up and running on port ${port}`);
  })
});

app.get('/', (req, res) => {
    console.info(__dirname);
    res.sendFile(__dirname + '/index.html')
});

app.post('/book', (req, res) => {
  db.collection('books')
    .save(req.body, (err, res) => {
        if (err) return console.info(err);
        console.info('saved to database');
        res.redirect('/');
    })
});