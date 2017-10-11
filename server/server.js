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

var apiRoutes = express.Router();

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)

apiRoutes.post("/authenticate", function(req, res) {
  console.log("req.body", req.body);
  User.findOne(
    {
      name: req.body.name
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: "Authentication failed. User not found."
        });
      } else if (user) {
        if (user.password != req.body.password) {
          res.json({
            success: false,
            message: "Authentication failed. Wrong password."
          });
        } else {
          const payload = {
            admin: user.admin
          };
          var token = jwt.sign(payload, app.get("superSecret"), {
            expiresIn: 1440 * 60
          });

          res.json({
            success: true,
            message: "Enjoy your token!",
            token: token
          });
        }
      }
    }
  );
});

apiRoutes.use(function(req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, app.get("superSecret"), function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

// route to show a random message (GET http://localhost:8080/api/)

// route to return all users (GET http://localhost:8080/api/users)

app.use("/api", apiRoutes);

apiRoutes.get("/", function(req, res) {
  res.json({ message: "Welcome to the coolest API on earth!" });
});

apiRoutes.get("/users", function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

app.use("/api", apiRoutes);

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
//console.log("Magic happens at http://localhost:" + port);
