const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3004;
const crud = require('./seeder.js')

const faker = require('faker');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../client/dist')));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HackReactormysql12345',
  database: 'reviews'
});

connection.connect((err) => {
  if (err) {
      console.log('Not connected to database');
      throw err;
  } else {
      console.log('Connected to database');
  }
});

//read
app.get('/api/reviews', (req, res) => {
  console.log('in GET')
  var queryString = 'SELECT * FROM reviews';
  connection.query(queryString, (err,data) => {
    if(err){
      console.log("Couldn't Retrieve Reviews Data from DB!");
    } else {
      res.statusCode = 200;
      res.json(data);
      console.log("got reviews");

    }
  })
});

//create
app.post('/api/reviews', (req, res) => {
  crud.insertReview((err, data) => {
    if (err) {
      console.log('error in post', err);
    } else {
      console.log('success in post');
      res.send(data)
    }
  });
})

//update
app.put('/api/reviews', (req, res) => {
  var author = req.headers.author;
  var id = req.headers.id;
  crud.updateReview(author, id, (err, data) => {
    if (err) {
      console.log('error in put', err);
    } else {
      console.log('success in put');
      res.send(data);
    }
  })
})

//delete
app.delete('/api/reviews', (req, res) => {
  var id = req.headers.id;
  crud.deleteReview(id, (err, data) => {
    if (err) {
      console.log('error in delete', err)
    } else {
      console.log('success in delete');
      res.send(data);
    }
  })
})

var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = server;
