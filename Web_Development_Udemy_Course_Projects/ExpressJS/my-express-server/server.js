
const express = require("express");

const app = express();
// generally 'app' is used for referring the express() module

// app.listen(3000);
// app has listen() method which tells to listen to any http request on port 3000, that gets sent to our server

// with this code, we have started our server on port 3000

/*
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
*/
// using the Callback function to tell us in the console that our server has started

/*
*** When we run the code in terminal using 'node server.js' -> the server get's started

*** We can go to 'localhost:3000' on the browser to open our server.

** But now it is showing 'Cannot GET /' as our server is not giving anything to the response on port 3000
*/

// # localhost:3000/ is the Root of our website


app.get("/", function(req, res) {
  res.send("<h1>Hello World!</h1>");
});
// request -> req, response -> res => their short forms are used

// when our server Gets a Request from the browser onto '/' -> 'Home Route'
// we send the response as 'Hello'.
//Hence, now the localhost will not show any error

//### Note: We can send HTML as a response, so that it gets printed on the webpage

/*
root : home url or the main page

route : urls ( root is the home route. there are different routes for different sections such as about, contact, etc)
*/

app.get("/contact", function(req, res) {
  res.send("Contact me at: narendra@gmail.com");
});
// when someone tries to request for the '/contact' page / route; then respond with what is given
// We are setting up the 'Routes'

app.get("/about", function(req, res) {
  res.send("My name is Narendra Jadhav. I am a Computer Engineering student. I like to code.")
});

app.get("/hobbies", function(req, res) {
  res.send("<h1>Hobbies</h1><ul><li>Coding</li><li>Designing</li><li>Cricket</li></ul>")
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// ********* Note: 'Ctrl + c' -> to terminate the server going on

// **** Note: Each time we make changes to the server.js here we have to restart the server

/*
********************
Installing Nodemon (a node utility) -> It automatically restarts our server, when we change the code

*** npm install -g nodemon

* to start the server for the first time: ->
*** nodemon server.js
*/
