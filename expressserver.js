'use strict';

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/api', function(req, res){
  res.send("hello from api");
})

app.listen('3000', function(){
  console.log("listening on port ", 3000);
})

app.use(function(req, res, next){
  res.status(404).send("404 Not Found")
})
