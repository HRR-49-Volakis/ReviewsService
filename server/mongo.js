const faker = require('faker');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/reviews';

//conn = new Mongo();
//db = conn.getDB("reviews");

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to mongo server");

  var db = client.db('reviews')
  for (var i = 0; i < 100; i++) {
    db.collection('reviews').insertMany([
      {product_id: faker.random.number(), author: 'MongoMongo'},
      {product_id: faker.random.number(), author: 'Cheese'},
    ])
  }
  db.collection('reviews').deleteMany({})

  client.close();
});

