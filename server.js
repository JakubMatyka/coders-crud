// 1. Use template engine to generate html with data

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Book = require('./book');
let db;

const app = express();
const port = 3000;

const url = 'mongodb://kmatyka:qlop01lwe@ds145790.mlab.com:45790/book';

// use Embedded JS
app.set('view engine', 'ejs');

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
  // The toArray method takes in a callback function and allow to manipulate data
  db.collection('books').find().toArray((err, result) => {
    // view is a view from folder views
    res.render('index.ejs', {titles: result})
  });
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