const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const faker = require('faker');

app.use(bodyParser.json());

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'HackReactormysql12345',
//   database: 'reviews'
// });

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

// connection.connect((err) => {
//   if (err) {
//       console.log('Not connected to database');
//       throw err;
//   } else {
//       console.log('Connected to database');
//   }
// });

//create
var insertReview = (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, callback) => {
  client.query(`INSERT INTO reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended) VALUES ('${product_id}', '${title}', '${text}', '${date}', '${author}', ${overall_rating}, ${value_rating}, ${quality_rating}, ${appearance_rating}, ${ease_of_assembly_rating}, ${works_as_expected_rating}, ${recommended})`, (err, results) => {
    callback(err, results);
  })
}

//update
const updateReview = (author, id, callback) => {
  client.query(`UPDATE reviews SET author = '${author}' WHERE id = '${id}'`, (err, results) => {
    callback(err, results);
  });
}

const deleteReview = (id, callback) => {
  client.query(`DELETE FROM reviews WHERE id = ${id}`, (err, results) => {
   callback(err, results)
  })
}

function createReview() {
  const obj = {};
  obj.product_id = faker.random.uuid();
  obj.title = faker.lorem.words();
  obj.text = faker.lorem.sentence();
  obj.date = faker.date.past()
  obj.author = faker.name.findName();
  obj.overall_rating = faker.random.number({
    'min': 1,
    'max': 5
  });
  obj.value_rating = faker.random.number({
    'min': 1,
    'max': 5
  });
  obj.quality_rating = faker.random.number({
    'min': 1,
    'max': 5
  });
  obj.appearance_rating = faker.random.number({
    'min': 1,
    'max': 5
  });
  obj.ease_of_assembly_rating = faker.random.number({
    'min': 1,
    'max': 5
  });
  obj.works_as_expected_rating = faker.random.number({
    'min': 1,
    'max': 5
  });
  obj.recommended = faker.random.boolean()
  return [obj];
};

var seedReviews = () => {
  for (let i = 0; i < 100; i++) {
    var review = createReview();
    connection.query('INSERT INTO reviews SET ?', review, (error, results) => {
      if (error) {
        console.error(error);
      }
      console.log(results);
    });
  }
};

//seedReviews();

module.exports.insertReview = insertReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;