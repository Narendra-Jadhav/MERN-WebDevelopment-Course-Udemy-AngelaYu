require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
// Configure the Strategy
const findOrCreate = require("mongoose-findorcreate")

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: "Our little secret.",
  // any random string
  resave: false,
  saveUninitialized: false
}));

// initialize passport and using session in passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", false);

// mongoose.connect("mongodb://localhost:27017/todolistDB");
// mongodb+srv://admin-narendra:<password>@cluster0.nafi490.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect("mongodb+srv://admin-narendra:Test123@cluster0.nafi490.mongodb.net/todolistDB");
mongoose.connect("mongodb+srv://admin-narendra:Test123@cluster0.nafi490.mongodb.net/todolistDB?retryWrites=true&w=majority");

// not necessary to write -> const itemsSchema = new mongoose.Schema({});
// const itemsSchema = {
//   name: String
// };

const userSchema = new mongoose.Schema ({
  email: String,
  password: String,
  googleId: String,
  // for logging in through google. To identify each user uniquely
  facebookId: String,
  listItems: [{ type: String }]
});

// "Welcome to your ToDo List!", "Hit the + button to add a new item.", "<-- Hit this to delete an item."

// to hash and salt password and save to database
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

// Passport local configuration
passport.use(User.createStrategy());

// serializeUser means making cookie of the user and deserializeUser means destroying cookie.
// THESE ARE FOR LOCAL AUTHENTICATION AS THIS IS FROM passportLocalMongoose
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// this will work for all kinds of strategies - local, google, etc
// passport packs user data (session id...) into COOKIE
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// passport opens cookie, sees our session id, authenticate them on our server
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// GoogleStrategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/list"
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);

  User.findOrCreate({ username: profile.emails[0].value, googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
  // Adding the user profile information to our Database
}
));
// npm install mongoose-findorcreate => for findOrCreate in an easier way by directly using this as a plugin

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/list"
},
function(accessToken, refreshToken, profile, cb) {

  console.log(profile);

  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

// ------------------------------------------------------

// const Item = mongoose.model("Item", itemsSchema);

// const item1 = new Item ({
//   name: "Welcome to your ToDo List!"
// });

// const item2 = new Item ({
//   name: "Hit the + button to add a new item."
// });

// const item3 = new Item ({
//   name: "<-- Hit this to delete an item."
// });

// const defaultItems = [item1, item2, item3];

//for custom lists
// const listSchema = {
//   name: String,
//   items: [itemsSchema]
//   // items will have the itemsSchema
// };

// const List = mongoose.model("List", listSchema);


app.get("/", (req, res) => {
  res.render("home");
});

// a get request will be sent to /auth/google when the Sign Up/In button is pressed on Register and Login page
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
  // asking the google server to send Profile of the usser
);
// Authentication with passport by google Strategy, like what we did earlier with local Strategy
// NOTE: By this we will be able to see the screen having Signin with Google with our Google Accounts there.


// get request by Google to Authorize the user to the website
app.get("/auth/google/list",
  passport.authenticate('google', { failureRedirect: "/login" }),
  // if failure redirect to login page
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/list");
  });


app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get("/auth/facebook/list",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/list");
  });


app.get("/list/:email", async (req, res) => {

  const day = date.getDate();
  const username = req.params.email;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          res.status(404).send({ message: 'User not found' });
      } else {
        res.render("list/" + username, {listTitle: day, newListItems: user.listItems});
      }
  } catch (err) {
      res.status(500).send(err);
  }

});
  // using find() method of mongoose to get the data from database in node.js.
  // the condition parameter is kept empty {} -> as we have to select everything in it
  // foundItems is what we get on find()
  // Item.find({}, function(err, foundItems) {

  //   // using if else so that the default items get added to the database only if there are no items.
  //   // we cannot simply comment it out after one use, because then we will not be able to use such code on Heroku
  //   if (foundItems.length === 0) {
  //     Item.insertMany(defaultItems, function(err) {
  //       if(err) {
  //         console.log(err);
  //       } else {
  //         console.log("Successfully saved default items to database!");
  //       }
  //     });

  //     res.redirect("/list");
  //     //redirecting it to '/', so that it will go in else next time and render the page
  //     // else is necessary because, without redirecting first time we can see no items in the list.
  //   } else {
  //     res.render("list", {listTitle: day, newListItems: foundItems});
  //     // but by foundItems the whole json is printed, but we want only name
  //     // So, we have done .name in list.ejs
  //   }
  // });


// express route parameters - for custom lists
// app.get("/:customListName", function(req, res) {
//   // _.capitalize() is a lodash method which capitalizes the first letter and makes other to lowercase
//   const customListName = _.capitalize(req.params.customListName);

//   // to find if the searched list name is already present
//   List.findOne({name: customListName}, function(err, foundList) {
//     if(!err) {
//       // if not found, then create that list
//       if(!foundList) {
//         //create a new list
//         const list = new List({
//           name: customListName,
//           items: defaultItems
//         });

//         list.save();
//         res.redirect("/" + customListName);
//         // to load that webpage

//       } else {
//         //show an existing list
//         res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
//       }
//     }
//   });
// });


app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/logout", function(req, res) {
  // logout method deAuthenticates the user, so that the user now can't access secrets page directly
  // logout should have a callback function
  req.logout(function(err) {
    if (err) {
      console.log(err);
      return next(err); // By using return next it will jump out the callback immediately and the code below return next() will be unreachable
    }
    res.redirect("/");
  });
});

app.post("/list/:email", async (req, res) => {

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const username = req.params.email;

  try {
    const user = await User.findOne({ username });
    if (!user) {
        res.status(404).send({ message: 'User not found' });
    } else {
        user.listItems.push(itemName);
        await user.save();
        res.send({ message: 'Item added' });
        res.redirect("/list/" + username);
    }
  } catch (err) {
      res.status(500).send(err);
  }

  // if (listName === date.getDate()) {
  //   item.save();
  //   res.redirect("/list");
  // } else {
  //   // if list is not Todays's list, then finding that list and adding the item in that
  //   List.findOne({name: listName}, function(err, foundList) {
  //     foundList.items.push(item);
  //     // we will push the new item in the foundList's items array
  //     foundList.save();
  //     res.redirect("/" + listName);
  //     // redirecting to that list, i.e to the get() of that custom list
  //   });
  // }
});

// post route for delete
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  // got this from the hidden input in list.ejs

  // if list is today's list then delete by this method
  if (listName === date.getDate()) {
    // method to delete by _id
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Successfully deleted the checked item.");
        res.redirect("/list");
        // redirecting to home route, to display the updated list after deleting
      }
    });
  } else {
    // if list is custom list
    // findOneAndUpdate() method from mongoose has 3 parameters
    // 1) which to find and update
    // 2) what to update -> $pull is a MongoDB operator used to find an element in an array in a document and delete that
    // we can also use a for loop, but that will be complicated
    // $pull{name of array: {which element from array to delete}}
    // 3) callback function
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if(!err) {
        res.redirect("/" + listName);
      }
    });
  }
});

app.post("/register", function(req, res) {

  // register method is from passport-local-mongoose
  // username is passed as js object, function returns the user
  const username = req.body.username;

  User.register({username}, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      // if no error, authenticate the user as 'local'
      // passport.authenticate("local")(req, res, function() {
      //   res.redirect("/secrets");
      // });
      req.login(user, function(err) {
        if (err) {
           return next(err);
        }
        return res.redirect('/list' + username);
      });
    }
  });

});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/list',
  failureRedirect: '/login'
})
);

let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
// listen on heroku port, but if not that then on 3000

app.listen(port || 3000, function() {
  console.log("Server has started successfully.");
});
