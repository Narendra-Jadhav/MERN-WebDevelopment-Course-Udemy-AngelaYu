const express = require("express");
const https = require("https");
// https module is a native module in node package, so we don't need to install it
// it is used to get information from an external server (here OpenWeatherMap), through https GET response

const app = express();

app.use(express.urlencoded({
  extended: true
}));
// no need of Body Parser

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "787c33f4061dd537bbb93acbf5d86134";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  // "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=787c33f4061dd537bbb93acbf5d86134&units=metric"
  https.get(url, function(response) {
    console.log(response.statusCode);
    // we will get the response from OpenWeatherMap in the Hyper Terminal as we console logged it
    //we can print only the status code also -> it gives 200 (OK)
    // we can get a 404 status code, which means Resource Not Found Error. It can occur if we make some typo in the URL Endpoint
    // 401 error -> if some mistake in the API key. It means we are not Authorised, as we have wrong appid

    response.on("data", function(data) {
      /*
      console.log(data);
      // by this we can get data we want from the API
      // we will get data in Hexadecimal Code format.
      */

      const weatherData = JSON.parse(data);
      // by this we can convert the Hex code in JavaScript Object format using JSON.parse() method
      // JavaScript Object -> so string in the keys
      // console.log(weatherData);

      /*
      const object = {
        name: "Narendra",
        favouriteColor: "Green"
      }
      console.log(JSON.stringify(object));
      // to convert JavaScript Object into a String i.e. the keys will also be strings
      */

      const temp = weatherData.main.temp;
      // we can get specific values from the data eg. temp
      // for that we need to go through the keys which are main.temp
      // if the json is very large, we can easily get that path from the JSON Viewer Extension, by right clicking
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      // weather object is an array with 1 item, so we did weather[0]
      // console.log(weatherDescription);

      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");

      // for the weather icons of weather conditions
      // http://openweathermap.org/img/wn/10d@2x.png -> url of image where that 10d is the code
      // that code is in icon object inside weather

      const iconCode = weatherData.weather[0].icon;
      const icon = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

      res.write("<img src=" + icon + " alt='Weather Conditions Icon'>");
      // we can use '' inside a ""

      res.send();
      // NOTE: we can send only once in a get request.
      // But we can have multiple write and then we can send

    });
  });
});

app.listen(3000, function() {
  console.log("Server is running on Port 3000.");
});
