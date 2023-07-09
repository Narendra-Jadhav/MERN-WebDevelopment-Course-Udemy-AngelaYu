const express = require("express");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
// initialising items array
const workItems = [];

app.set("view engine", "ejs");
// to tell app to use ejs as view engine

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
// to run the other static files like css, images

app.get("/", function(req, res) {

  const day = date.getDate();
  // we can use getDate() or getDay() function from the Our date module to get the date or day

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
  // response is being sent by telling to render the list file with ejs extension in the views folder;
  // the key: value pair of variables is also there; where the key is variable in ejs file, and value is
  // what to be sent there
});

app.post("/", function(req, res) {
  const item = req.body.newItem;

  // based on the list name we are specifying in which list it should be pushed and to which it should redirect
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);

    // if we render it here we will get error, as the webpage will not know newListItem when it renders upside
    // so, we have put newListItem: item upside
    // now we will only "redirect" it

    res.redirect("/");
    // when we will get the post request we will redirect it to the home route, i.e it will go to app.get("/")
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server is running on Port 3000");
});
