var express = require('express');
var mysql = require('mysql');
var app = express();
var con;

app.use(express.static(__dirname));
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/test.html');
});
app.listen(8000);

con = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'Deva@01234',
	database:'onlineshop'
});

var concallback = (err,res)=>{
	if(err) throw err;
	console.log(res);
};

con.connect((err)=>{
	if(err) throw err;
	console.log("Connected!!");

	//for first run
	/* 
	con.query("CREATE DATABASE onlineshop;",concallback);
	con.query("USE onlineshop",concallback);
	con.query("CREATE TABLE USERLIST(ID INT NOT NULL AUTO_INCREMENT,NAME VARCHAR(30),PASSWORD VARCHAR(13),PRIMARY KEY(ID));",concallback);
	*/
	con.query("SELECT * FROM USERLIST;",concallback);
});



