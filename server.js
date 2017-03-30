// 1. Get titles from database
// 2. Use some template engine for displaying titles

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Book = require('./book');
let db;

const app = express();
const port = 3000;

const url = 'mongodb://kmatyka:qlop01lwe@ds145790.mlab.com:45790/book';

app.use(bodyParser.urlencoded({
  encode: true,
  extended: true
}));

MongoClient.connect(url, (err, res) => {
  if (err) {
    return console.info(err);
  }

  db = res;
  app.listen(port, () => {
    console.info(`Server is up and running on port ${port}`);
  })
});

app.get('/', (req, res) => {
  //cursor object contains all titles from database.
  const cursor = db.collection('books')
    .find();

  res.sendFile(__dirname + '/index.html')
});

app.post('/book', (req, res) => {
  const book = new Book();

  book.title = req.body.title;
  book.description = req.body.description;

  db.collection('books')
    .save(book, (err, result) => {
      if (err) {
        return console.info(err);
      }

      console.info('saved to database');
      res.redirect('/');
    })
});