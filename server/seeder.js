const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const faker = require('faker');

app.use(bodyParser.json());

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

//create
var insertReview = () => {
  connection.query('insert into reviews set ?', createReview(), (err, results) => {
    if (err) {
      console.log('error with inserting 1 review')
    } else {
      console.log(results)
    }
  })
}

//update
const updateReview = (author, id) => {
  connection.query(`UPDATE reviews SET author = '${author}' WHERE id = '${id}'`, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results)
    }
  });
}

const deleteReview = (id) => {
  connection.query(`DELETE FROM reviews WHERE id = ${id}`, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      console.log(results);
    }
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
  return obj;
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