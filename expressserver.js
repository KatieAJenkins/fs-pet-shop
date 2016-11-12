'use strict';
var fs = require ('fs');
var path = require ('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.disable('x-powered-by');//??ask about this
app.use(bodyParser.json());//??ask about this

app.use(express.static('public'));

app.get('/pets', function(req, res){//??not doing anything with req - why again?
  fs.readFile(petsPath, 'utf8', function(err, data){//this will change to PostgreSQL
    if (err) { //error checking comes 1st!
      console.log(err.stack);//??not sure what this is
      return res.sendStatus(200);//??research this more
    }
    var pets = JSON.parse(data);//this variable must stay here!! changing .json data
    // console.log(data);
    // console.log(pets);
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      console.log(err.stack);
      return res.sendStatus(200);
    }
    var id = Number.parseInt(req.params.id);//what is this doing??
    //what if id is undefined?

    var pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(pets[id]);
  });
});

app.post('/pets', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if (err) {
      console.log(err.stack);
      return res.sendStatus(200);
    }
//age, kind, name are missing or age !integer, do not add and send back 400 Bad Request
  var pet = req.body;
  console.log(req.body);

  if(!pet) {
    return res.sendStatus(400);
  }

  // if (!age){
  //   return res.sendStatus(400);
  // }

  // if (!age || !kind || !name) {
  //             console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
  //             process.exit(1);
  //         }}

  var pets = JSON.parse(petsJSON);

  pets.push(pet);

  var petsJSON = JSON.stringify(pets);

  fs.writeFile(petsPath, petsJSON, function(writeErr) {
    if (writeErr) {
      throw writeErr;
    }
      res.send(pet);
  });
})
});

// app.put('/pets/:id', function(req, res){
//
// })
app.get('/pets/:id', function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, petsJSON){
    if (err) {
      console.log(err.stack);
      return res.sendStatus(200);
    }
    var id = Number.parseInt(req.params.id);//what is this doing??

    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(pets[id]);

    //what if id is undefined
  });
});


app.use(function(req, res, next){
  res.status(404).send("404 Not Found")
});

app.listen(port, function(){
  console.log("listening on port ", port);
});

module.exports = app;
