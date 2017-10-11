var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config");
var User = require("./app/models/user");
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set("superSecret", config.secret);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

// TODO: route middleware to verify a token

//apiRoutes.get('/', function(req, res) {
//  res.json({ message: 'Welcome to the coolest API on earth!' });
//});

//apiRoutes.get('/users', function(req, res) {
//  User.find({}, function(err, users) {
//    res.json(users);
//  });
//});

//app.use("/api", apiRoutes);

app.get("/", function(req, res) {
  res.send("Hello! The API is at http://localhost:" + port + "/api");
});
app.get("/setup", function(req, res) {
  //sample user
  var kat = new User({
    name: "Kathryn Kelly",
    password: "meencantalamusica",
    admin: true
  });

  kat.save(function(err) {
    if (err) throw err;

    console.log("User saved successfully");
    res.json({ success: true });
  });
});
app.listen(8080);
console.log("Magic happens at http://localhost:" + port);
