var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'join_us'   // the name of your db
});

app.get("/", function(req, res){
	//Find count of users in database, and respond with that count
	var q = "SELECT COUNT(*) as count FROM users";
	connection.query(q, function (err, results){
		if (err) throw err;
		var count = results[0].count;
		// res.send("We have " + count + " users in our database");
		res.render("home", {data: count});
		
	})
 
});

app.post('/register', function(req,res){
 var person = {email: req.body.email};
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
 console.log(err);
 console.log(result);
 res.redirect("/");
 });
});

app.get("/joke", function(req, res){
	var joke = 'What do you call a dog that does magic? A labracadabrador!'
 res.send(joke);
});

app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.listen(3000, function(){
	
	console.log("Server running on 3000");
} );
