//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const session  = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
//Using sessions
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
//passport
app.use(passport.initialize());
//Tells passport to use session
app.use(passport.session());


//Created db using connection string
mongoose.connect("mongodb://localhost:27017/userDB");
//Initialized db constants
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

//Adding passportLocalMongoose plugin
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

passport.use(User.createStrategy());
//serializing and deserializing user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
  res.render("home");
});
app.get("/login", function(req, res){
  res.render("login");
});
app.get("/register", function(req, res){
  res.render("register");
});
app.post("/register", function(req, res){

});
//Geting data from the post routes

app.post("/login", function(req, res){


});

app.listen(3000, function(){
  console.log("Server started");
});
