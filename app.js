//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");




app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


//Created db using connection string
mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});


userSchema.plugin(encrypt, { secret: process.env.secret, encryptedFields: ["password"] });




const User = mongoose.model("user", userSchema);



app.get("/", function(req, res){
  res.render("home");
});
app.get("/login", function(req, res){
  res.render("login");
});
app.get("/register", function(req, res){
  res.render("register");
});
app.get("/secrets", function(req, res){
  res.render("secrets");

});
app.post("/register", function(req, res){
  User.findOne({email: req.body.username}, function(foundItems){
    if(foundItems){
      res.redirect("login");
    }else{
      const newUser = new User({
        email: req.body.username,
        password: req.body.password
      });
      newUser.save();
    }

  });
});
//Geting data from the post routes

app.post("/login", function(req, res){
User.findOne({email: req.body.username}, function(err, foundUser){
  if(err){
    res.send(err);
  }else{
    if(foundUser){
      if(foundUser.password === req.body.password){
        res.redirect("secrets");
      }else{
        res.send("Wrong password");
      }

    }else{
      res.send("User not found");
    }
  }

});

});

app.listen(3000, function(){
  console.log("Server started");
});
