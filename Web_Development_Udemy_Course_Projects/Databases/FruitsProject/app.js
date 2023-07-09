
// MongoDB and Node.JS using Mongoose Package

const mongoose = require("mongoose");

//This one line will do the work of Connection URL, Database Name, Create a new MongoClient, and
// connecting to the server.
// if fruitsDB is not present it will make the new database of that name
mongoose.connect("mongodb://localhost:27017/fruitsDB");

// Inserting Documents (Data)

/*
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});
*/
// Its necessary to make a schema each time for a collection


//------------------------------------------------------------------------------

// Data Validation with mongoose =>
// with mongoose we can easily do the validation

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified."]
    // type and required are for validation
    // required is used to specify that this field is compulsory, and if it is not given; then don't add it to database.
    // it has two parameters in a array. First is 'true' or '1'
    // second is optional. It is a message to be provided
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  // min and max are for validation. Any number not between 1 and 10 will be not valid due to this
  review: String
});

//------------------------------------------------------------------------------


const Fruit = mongoose.model("Fruit", fruitSchema);
// Fruit is like a class. It is called 'model' here. "Fruit" is the collection name
// In mongoose, we give the collection name like this and mongoose makes it in lowercase
// and makes plural by itself. It uses Lodash at backside for this
// so, first parameter is collection name (in singular) and second parameter is Schema

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit!"
});
// fruit object is made, denoting a document

// fruit.save();
// it will save/add the document. Every time we run this new Apples will get added. So, we can comment this if we want

// -----------------------------------------------------------------------------
// **** Establishing Relationships and Embedding Documents using mongoose

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
  // Embedding fruitSchema in Person Schema
});

const Person = mongoose.model("Person", personSchema);
// mongoose will make plural of Person as 'people' for the collection

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Great fruit!"
});

// pineapple.save();

// const person = new Person ({
//   name: "John",
//   age: 37
// });

const person = new Person ({
  name: "Amy",
  age: 20,
  favouriteFruit: pineapple
  // pineapple object from Fruit model
});
// Amy will have favouriteFruit as pineapple. It will be a javascript object of everything about pineapple,
// as it is having Relationship with that

// person.save();

const kiwi = new Fruit ({
  name: "Kiwi",
  rating: 10,
  review: "The best fruit!"
});

const orange = new Fruit ({
  name: "Orange",
  rating: 5,
  review: "Too sour!"
});


const banana = new Fruit ({
  name: "Banana",
  rating: 9,
  review: "Awesome!"
});

// to insert more than one documents ->
// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitDB!");
//   }
// });
// first parameter is array of the objects and second is a callback function which can tell if any error is there

// commenting the insertMany() function as, it will insert the fruits again


// find documents from nodejs (Reading from the database with mongoose)
Fruit.find(function(err, fruits) {
  if(err) {
    console.log(err);
  } else {

    // after we are done with our work with the database, we should close it from the app.
    // so, we will not need to close the server with ctrl + c every time.
    // So, once there is no error and done with Fruit we can close the database
    // mongoose.connection.close();
    mongoose.connection.close(function () {
            process.exit(0); // to close the database/server immediately. Without this, it takes some time to close
    });

    // console.log(fruits);
    // fruits is a array. i.e find() returns an array
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});
// find() function on the Fruit model. It will have a callback function with two parameters -> err and fruits
// err is for error and fruits for what we get on doing find().


// ------------------------------------------------------------------------------

// **** Update ****
// updateOne() has 3 parameters
// 1) selecting document which we have to update. We can use the _id provided by mongodb for that
// 2) what to update/ which field to update. Even if it is already not present, it will get added to the document
// 3) callback function for checking if any error is there

// Fruit.updateOne({_id: "62cdadda396aaa8a5d41bf48"}, {name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document!");
//   }
// });

// Person.updateOne({name: "John"}, {favouriteFruit: banana}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully added favourite fruit!");
//   }
// });

// ------------------------------------------------------------------------------
// **** Delete ****
// deleteOne() function has 2 parameters
//1) which document to delete. So, delete the document having name as Peach. It deletes the first document having that name
//2) callback function for error
// Fruit.deleteOne({name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document!");
//   }
// });

// ** deleteMany()
// to delete all the documents having that field

// Person.deleteMany({name: "John"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted all the documents!");
//   }
// });
