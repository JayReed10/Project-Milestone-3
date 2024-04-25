const express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

const app = express();
var server = http.createServer(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));
app.use(helmet());
app.use(limiter);

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'./Ht.html'));
});

app.get('/About Me', function(req, res) {
  res.sendFile(path.join(__dirname,'./About.html'));
});
app.get('Home', function(req, res) {
  res.render('Home.html', { });
});
app.get('/Contact.html', function(req, res) {
  res.render('Contact.html', { });
});

server.listen(3000,function(){
    console.log("Server listening on port: 3000");
}); 

app.post('/item', function(req,res){
  console.log([req.body.First, req.body.Last]);
  
  const text =`
  <ol>
  <li>${req.body.First}</li>
  <li>${req.body.Last}</li>
  </ol>
  `;
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(text);  
});