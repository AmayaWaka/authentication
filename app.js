//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


//Created db using connection string
mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema = {
  email: String,
  password: String

};



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
app.post("/register", function(req, res){

});
//Geting data from the post routes

app.post("/login", function(req, res){


});

app.listen(3000, function(){
  console.log("Server started");
});
