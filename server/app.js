const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3004;
const crud = require('./seeder.js')

require('newrelic');

const faker = require('faker');

const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/reviews';
const client = new Client({
    connectionString: connectionString
});
client.connect((err) => {
  if (err) {
    console.log('not connected postgres')
  } else {
    console.log('connected to postgres')
  }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../client/dist')));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'HackReactormysql12345',
  database: 'reviews'
});

// connection.connect((err) => {
//   if (err) {
//       console.log('Not connected to database');
//       throw err;
//   } else {
//       console.log('Connected to database');
//   }
// });

//read
app.get('/api/products/:id/reviews', (req, res) => {
  console.log('in GET')
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  // var queryString = "select * from reviews where product_id = 1";
  // client.query(queryString, (err,data) => {
  //   if(err){
  //     console.log("Couldn't Retrieve Reviews Data from DB!");
  //   } else {
  //     res.statusCode = 200;
  //     res.json(data);
  //     console.log("got reviews");

  //   }

  // })
});

app.get('/api/products/:id/reviews/allReviews', (req, res) => {
  var id = req.params.id;
  console.log('from get. id = ', id)
  var queryString = `select * from reviews where product_id = ${id}`;
  client.query(queryString, (err,data) => {
    if(err){
      console.log("Couldn't Retrieve Reviews Data from DB!");
    } else {
      res.statusCode = 200;
      res.json(data);
      console.log("got reviews");

    }

  })
})

//create
app.post('/api/reviews', (req, res) => {
  var product_id = req.body.product_id;
  var title = req.body.title;
  var author = req.body.author;
  var overall_rating = req.body.overall_rating;
  var text = req.body.text;
  var date = req.body.date;
  var value_rating = req.body.value_rating;
  var quality_rating = req.body.quality_rating;
  var appearance_rating = req.body.appearance_rating;
  var ease_of_assembly_rating = req.body.ease_of_assembly_rating;
  var works_as_expected_rating = req.body.works_as_expected_rating;
  var recommended = req.body.recommended;
  crud.insertReview(product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, (err, data) => {
    if (err) {
      console.log('error in post', err);
    } else {
      console.log('success in post');
      res.send(data)
    }
  });
})

app.post('/api/reviewsTest', (req, res) => {

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
