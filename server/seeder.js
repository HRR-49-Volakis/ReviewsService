const express = require('express');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const faker = require('faker');
const fs = require('fs');
app.use(bodyParser.json());

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

//create
var insertReview = (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended, callback) => {
  client.query(`INSERT INTO reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended) VALUES ('${product_id}', '${title}', '${text}', '${date}', '${author}', ${overall_rating}, ${value_rating}, ${quality_rating}, ${appearance_rating}, ${ease_of_assembly_rating}, ${works_as_expected_rating}, ${recommended})`, (err, results) => {
    callback(err, results);
  })
}

//update
const updateReview = (author, id, callback) => {
  client.query(`UPDATE reviews SET author = '${author}' WHERE id = ${id}`, (err, results) => {
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
  obj.date = 'Dec 4 2020'
  obj.author = 'SethLassen';
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


// creates array of 10k reviews
var seedReviews = () => {
  var reviewsArray = [];
  for (let i = 0; i < 10000; i++) {
    var review = createReview();
    reviewsArray.push(review);
  }
  return reviewsArray;
};

var reviewsArr = seedReviews();

//console.log(reviewsArr.length)


const createReviewsHeader = () => {
  const reviewStream = fs.createWriteStream(`${__dirname}/data/reviewData.csv`);
  reviewStream.write('product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended\n');
};

const writeReviews = () => {
  //var i = 1;
  const reviewStream = fs.createWriteStream(`${__dirname}/data/reviewData.csv`, {flags: 'a'});
  for (let review of reviewsArr) {
    reviewStream.write(`${review.product_id},${review.title},${review.text},${review.date},${review.author},${review.overall_rating},${review.value_rating},${review.quality_rating},${review.appearance_rating},${review.ease_of_assembly_rating},${review.works_as_expected_rating},${review.recommended}\n`);
  }
}


writeReviewsBatches = () => {
  for (let i = 0; i < 1000; i++) {
    writeReviews();
    console.log('still going ' + i)
  }
}

const seed10MReviews = () => {
  console.log('entered seeding 10M')
  let query = `COPY reviews (product_id, title, text, date, author, overall_rating, value_rating, quality_rating, appearance_rating, ease_of_assembly_rating, works_as_expected_rating, recommended) FROM '/Users/sethlassen/Desktop/SDC/Reviews/server/data/reviewData.csv' DELIMITER ',' CSV HEADER`;
  client.query(query, (err, data) => {
    if (err) {
      console.error('failure in seeding', err)
    } else {
      console.log(`seeded reviews`);
    }
  })
}

const makeReviewsCSV = () => {
  createReviewsHeader();
  writeReviewsBatches();
}

const copyIntoPostgres = () => {
  seed10MReviews();
}

module.exports.insertReview = insertReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;