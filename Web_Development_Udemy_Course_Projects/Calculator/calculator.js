
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
/*
As of Express version 4.16, the body-parser npm package is depreciated.
An up-to-date revision of this is to use the built-in Express body parsers.

So instead of using bodyParser.urlencoded() in Express, you can use the built-in
express.urlencoded() parser instead

And assuming there's a move in later modules that use bodyParser.json() ,
there is also the similarly named express.json() parser as well.
*/
app.use(express.urlencoded({extended: true}));
// express now has built-in body parser, so no need to install that separately

// app.use(bodyParser.urlencoded({extended: true}));
// using bodyParser in the app.
// urlencoded is used when we have to take information from 'html forms'.
// extended: true is mandatory

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

/*
Note:
1. with sendFile() we can send as response a whole file.
So, we are sending the index.html file as response to the root route

2. __dirname is a constant for the Directory Name in which our server is based.
So, we should always use that along with index.html file for the whole path of the file
Hence, we can get Directory Path in any system

it will be: :C/Users/naren/Coding/Calculator/index.html
*/

app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

/*
Note: with this we are able to respond to requests.
But there is a Problem with Post-requests
eg. when we press the button of the form, it is a post request
So, to handle those ->
*/

app.post("/", function(req, res) {

  /*
  Inside any routing we can use body parser for getting the data obtained from http request.
  eg. On putting num1 = 5, num2 = 7, when we press the Button. This data is sent as request.
  To get that data we need Body Parser. And with urlencoded we get that data from html forms.

  So, by 'req.body' -> we can get the data.
  The data is obtained as objects. So, num1, num2 become objects.

  We can get their data by -> 'req.body.num1', 'req.body.num2' and use these
  */

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  // Note: req.body.num1 returns String (as type in html form was text),
  // so to change that to number we do Number(req.body.num1)

  var result = num1 + num2;

  res.send("The result of the calculation is: " + result);
});

app.post("/bmicalculator", function(req, res) {
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);
  // parseFloat for decimal number
  // Number is for Integer

  var bmi = weight / Math.pow(height, 2);
  bmi = bmi.toFixed(2);
  // toFixed(number of decimal) -> to round off the number of decimal places to a fixed number

  res.send("Your BMI is: " + bmi);
});

/*
Note: For responding the data to the post-request we need a package called 'body-parser'
Installing that:
* npm install body-parser
# it then comes to the dependencies
# we need to require it
*/

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

/*
**************** IMP *******************

If we do View Page Source on the website, we are able to see only the html code.
The javascript code where the logic of Calculation is there, is hidden from the user and it is at the backend.
So, this is the use of backend.
*/
