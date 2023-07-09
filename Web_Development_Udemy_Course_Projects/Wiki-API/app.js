
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// ** Note: We can make all these get, post, delete requests with Postman

/*
app.get("/articles", function(req, res) {

  // Read from database
  Article.find(function(err, foundArticles) {
    if (err) {
      res.send(err);
    } else {
      res.send(foundArticles);
    }
  });
});
*/

// # Chained Route Handlers using express:-> For the same route, instead of having get, post in different app. ; we
// can have them in one function app.route()
// app.route("/articles").get().post().delete();


//////////////////////////////// REQUESTS TARGETTING ALL ARTICLES ////////////////////////////////

app.route("/articles")

  // GET all aricles -> Client will get the data from the API
  .get(function(req, res) {

    // Read from database
    Article.find(function(err, foundArticles) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundArticles);
      }
    });
  })

  // POST an article into the API from the client
  // -> Using Postman for giving the Post request as we will not have an html form this time
  // # In Postman selecting: POST -> localhost:3000/articles -> Body -> urlencoded -> entering title and content
  .post(function(req, res) {

    // CREATE document in database using mongoose and adding this article
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      // with this callback function Postman will receive message that the Post request has been sent successfully
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully added a new article.");
      }
    });

  })

  // DELETE all articles
  // After writing the delete route code in app.js,
  // when we make delete request with Postman, all the articles get deleted
  .delete(function(req, res) {

    Article.deleteMany(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted all the articles.");
      }
    });

});

//////////////////////////////// REQUESTS TARGETTING A SPECIFIC ARTICLE ////////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res) {

  // articleTitle = _.kebabCase(req.params.articleTitle);
  // we will need to get kebab case of title also

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle) {
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No article matching that article was found!");
    }
  });

})

/*
.replaceOne() is used for Put.

- Here, it will overwrite always. So the overwrite flag should not be mentioned.

Article.replaceOne(
    {title: req.params.articleTitle},
    req.body,
    function(err){
        //Do what you want to do here
    }
);
.updateOne() is used for Patch.

- Here, it will wrap in $set always. So the overwrite flag should not be mentioned.

Article.updateOne(
    {title: req.params.articleTitle},
    req.body,
    function(err){
        //Do what you want to do here
    }
);
*/

// findOne methods have been used to first find and then delete. If not found we should be able to return that
// the article was not found
.put(function(req, res) {

  Article.findOneAndReplace(
    {title: req.params.articleTitle}, //which document to update
    req.body, //what to update in that
    function(err, foundArticle) {
      if (!err) {
        if (foundArticle) {
          res.send("Successfully updated article.");
        } else {
          res.send("No such article found!");
        }
      } else {
        res.send(err);
      }
    }
  );

})

.patch(function(req, res) {

  Article.findOneAndUpdate(
    {title: req.params.articleTitle}, //which document to update
    req.body, //what to update in that
    function(err, foundArticle) {
      if (!err) {
        if (foundArticle) {
          res.send("Successfully updated article.");
        } else {
          res.send("No such article found!");
        }
      } else {
        res.send(err);
      }
    }
  );

})

.delete(function(req, res) {

  Article.findOneAndDelete(
    {title:req.params.articleTitle},
    function(err, foundArticle) {
      if (!err) {
        if (foundArticle) {
          res.send("Successfully deleted the article!");
        } else {
          res.send("No such article found!");
        }
      } else {
        res.send(err);
      }
    }
  );

});


app.get("/", function(req, res) {
  res.send("Hello");
});

app.listen(3000, function() {
  console.log("Server started on Port 3000.");
});
