'use strict';
var fs = require ('fs');
var path = require ('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(express.static('public'));

app.get('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if (err) {
      console.log(err.stack);
      return res.sendStatus(200);
    }
    var pets = JSON.parse(petsJSON);

    res.send(pets);
  });
})

app.listen(port, function(){
  console.log("listening on port ", port);
})

app.use(function(req, res, next){
  res.status(404).send("404 Not Found")
})
