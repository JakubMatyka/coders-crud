const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  encode: true,
  extended: true
}));

app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/index.html')
});

app.post('/titles', (req, res) => {
    console.log('Wait for titles');
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});