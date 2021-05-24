const express = require('express');
const fs=require('fs');
const app = express();


const headertemp=fs.readFileSync(`${__dirname}/public/templates/headertemplate.html`,'utf-8');
const home=fs.readFileSync(`${__dirname}/public/src/index.html`,'utf-8');
const headtemp=fs.readFileSync(`${__dirname}/public/templates/headTemplate.html`,'utf-8');
const dress=fs.readFileSync(`${__dirname}/public/src/dress.html`,'utf-8');
const footertemp=fs.readFileSync(`${__dirname}/public/templates/footerTemplate.html`,'utf-8');
const electronics=fs.readFileSync(`${__dirname}/public/src/Electronics.html`,'utf-8');
const furniture=fs.readFileSync(`${__dirname}/public/src/Furniture.html`,'utf-8');
const gadgets=fs.readFileSync(`${__dirname}/public/src/Gadgets.html`,'utf-8');



const replaceTemplate=(template,header,head,footer)=>{
	let output=template.replace(/{%HEADER%}/g,header);
	output=output.replace(/{%HEAD%}/g,head);
	output=output.replace(/{%FOOTER%}/g,footer);
	return output;
}

app.use(express.static(__dirname+'/public'));


app.get('/',(req,res)=>{
	const result=replaceTemplate(home,headertemp,headtemp,footertemp);
	res.end(result);
});

app.get('/Dress',(req,res)=>{
	const result=replaceTemplate(dress,headertemp,headtemp,footertemp);
    res.end(result);

});

app.get('/Electronics',(req,res)=>{
	const result=replaceTemplate(electronics,headertemp,headtemp,footertemp);
    res.end(result);

});

app.get('/Furniture',(req,res)=>{
	const result=replaceTemplate(furniture,headertemp,headtemp,footertemp);
    res.end(result);

});

app.get('/Gadgets',(req,res)=>{
	const result=replaceTemplate(gadgets,headertemp,headtemp,footertemp);
    res.end(result);

});

app.use((req,res)=>{
	res.end("<h1>Page note found</h1>");
})
app.listen(8000);

// con = mysql.createConnection({
// 	host:'localhost',
// 	user:'root',
// 	password:'Deva@01234',
// 	database:'onlineshop'
// });

// var concallback = (err,res)=>{
// 	if(err) throw err;
// 	console.log(res);
// };

// con.connect((err)=>{
// 	if(err) throw err;
// 	console.log("Connected!!");

// 	//for first run
// 	/* 
// 	con.query("CREATE DATABASE onlineshop;",concallback);
// 	 con.query("USE onlineshop",concallback);
// 	 con.query("CREATE TABLE USERLIST(ID INT NOT NULL AUTO_INCREMENT,NAME VARCHAR(30),PASSWORD VARCHAR(13),PRIMARY KEY(ID));",concallback);
// 	*/
// 	con.query("SELECT * FROM USERLIST;",concallback);
// })