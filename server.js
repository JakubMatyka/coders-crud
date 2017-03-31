// 1. Modify data by update

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Book = require('./book');
let db;

const app = express();
const port = 3000;
const url = 'mongodb://kmatyka:qlop01lwe@ds147080.mlab.com:47080/somsome';

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  encode: true,
  extended: true
}));

// Make public folder accessible to all components
app.use(express.static(__dirname + '/public'));

// Make server able to read JSON files
app.use(bodyParser.json());

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
  db.collection('books').find().toArray((err, result) => {
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

app.put('/book' , (req, res) => {
  db.collection('books')
    .findOneAndUpdate({description: 'Baba'},{
        $set: {
          title: req.body.title,
          description: req.body.description
        }
      },{
        // search from the newest
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      })
});

app.delete('/book' , (req, res) => {
  db.collection('books').findOneAndDelete({title: req.body.title}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('No funk!')
  })
});