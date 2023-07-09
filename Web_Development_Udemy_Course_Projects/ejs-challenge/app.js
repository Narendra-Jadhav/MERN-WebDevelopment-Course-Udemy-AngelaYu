
// NOTE: while nodemon is running if we enter 'rs' in the console; it will restart the server

const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");
// generally '_' is used as a variable for lodash module
/*
In a url people can use any case. They can keep is capital or small, can include - for spaces.
So, we should give them same output for all.
Lodash helps in such case
eg. Aoo-Aoo, aoo aoo, aoo-aoo in an url should give same result.

So, we can use lodash and convert the text into lower case with spaces, so that we can match it with ours,
in the same lowercase format as lodash
*/

const posts = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {homeText: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res) {
  res.render("about", {aboutText: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactText: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

/*
let allPostTruncated = []
  allPosts.forEach(function(post){
    if(post.body.length > 100) {
      allPostTruncated.push({title: post.title,body: post.body.substring(0,97) + "..."});
    };
  });
  res.render(__dirname + "/views/home.ejs", {posts:allPostTruncated});
*/
// To do the substring on the server side


app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);
  // lodash is used here to convert (text in url) to lowercase
  // if we have to convert various strings -> then in the bracket we can pass array of strings

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle) {
      res.render("post", {title: post.title, content: post.content});
    }
  });

});

/*
Express Routing Parameters
-> for dynamic url
-> Instead of making get route for each of the webpages, we can use Routing Parameters
app.get("/news/:topic", function(req, res) {
  console.log(req.params.topic);
});
-> So, this is the syntax to use parameters for Routes
*/


app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    slug: _.kebabCase(req.body.postTitle),
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
