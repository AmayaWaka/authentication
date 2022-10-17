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
//Initialized db constants
const userSchema = {
  email: String,
  password: String
}
const Users = mongoose.model("user", userSchema);





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
  const newName = new Users({
    email: req.body.email,
    password: req.body.password

  });


});







app.listen(3000, function(){
  console.log("Server started");
});
