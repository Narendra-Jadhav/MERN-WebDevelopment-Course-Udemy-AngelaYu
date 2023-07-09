
// MongoDB and Node.JS using Native MongoDB Driver

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// assert is something for Validation in MongoDb

// Connection URL
const url = 'mongodb://localhost:27017';
// its the url for mongodb. 27017 is the port number for mongodb. We are running it on localhost

// Database Name
const dbName = 'fruitsDB';
// it will create the database, if not already present

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  /*
  insertDocuments(db, function() {
    client.close();
  });
  insert if we have to insert. find if we have to find documents and print them
  */

  findDocuments(db, function() {
    client.close();
  });
  // once documents are inserted then only we will close the client
});

// Inserting Documents (Data)
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit!"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function(err, result) {
    assert.equal(err, null);
    // validation to check there is no error
    // assert.equal(3, result.result.n);
    assert.equal(3, result.insertedCount);
    assert.equal(3, Object.keys(result.insertedIds).length);
    // assert.equal(3, result.ops.length);
    // validation to check 3 documents have been inserted
    // if we put only 2 documents, it will give error
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


// find documents from nodejs

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
