'use strict';
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var morgan = require('morgan');
app.use(morgan('dev'));

var bodyParser = require('body-parser');
app.disable('x-powered-by'); //??ask about this
app.use(bodyParser.json()); //??ask about this

app.use(express.static('public'));

app.get('/pets', function(req, res) { //??not doing anything with req - why again?
    fs.readFile(petsPath, 'utf8', function(err, data) { //this will change to PostgreSQL
        if (err) { //error checking comes 1st!
            console.log(err.stack); //??not sure what this is
            return res.sendStatus(500); //??research this more..shouldnt this be a 400 msg
        }
        var pets = JSON.parse(data); //this variable must stay here!! changing .json data
        // console.log(data);
        // console.log(pets);
        res.send(pets);
    });
});

app.get('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            console.log(err.stack);
            return res.sendStatus(500);
        }

        var id = Number.parseInt(req.params.id); //parse string and return integer
        // console.log(id);

        var pets = JSON.parse(data); //do not move variable

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        if (id === undefined) {
            res.send(pets);
        }

        res.send(pets[id]);
    });
});

app.post('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.log(err.stack);
            return res.sendStatus(500);
        }

        var pet = req.body;
        // console.log(req.body);
        // console.log(pet);

        if (!pet) {
            return res.sendStatus(400);
        }

        //need to fix error checking
        if (pet.age === undefined || pet.kind === undefined || pet.name === undefined) {
            return res.sendStatus(500).send("Please enter pet age kind name");
        }

        var pets = JSON.parse(petsJSON);
        // console.log(petsJSON);

        pets.push(pet);

        var petsJSON = JSON.stringify(pets); //contents of the file we are reading if it doesn't error

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
            if (writeErr) {
                throw writeErr;
            }
            res.send(pet);
        });
    })
});

//put -- find item by index, over write with new pets
app.put('/pets/:id', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
        if (err) {
            console.log(err.stack);
            return res.sendStatus(500);
        }

        var id = Number.parseInt(req.params.id); //parse string and return integer
        // console.log(id);

        var pets = JSON.parse(petsJSON); //do not move variable

        var updatePet = pets[id];
        console.log(pets[id]);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        var newPet = req.body;
        console.log(newPet);

        if (!newPet) {
            return res.sendStatus(400);
        }

        if (newPet.age === undefined || newPet.kind === undefined || newPet.name === undefined) {
            return res.sendStatus(500).send("Please enter pet age kind name");
        }

        pets.splice(id, 1, newPet);

        var petsJSON = JSON.stringify(pets); //contents of the file we are reading if it doesn't error

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
            if (writeErr) {
                throw writeErr;
            }
            res.send(newPet);
        });
    });
});



//
// if (id === undefined) {
//   res.send(pets);
// }



//delete

// app.delete("/pets/:id", 'utf8', function(req, res){
//   if(pets.length <= req.params.id){
//     res.statusCode = 400;
//     return res.send('400 Not Found');
//   }
//   var pets = JSON.parse(petsJSON);
//
//   pets.splice(req.params.id, 1);
//   res.send(pets);
// })

app.use(function(req, res, next) {
    res.status(404).send("404 Not Found")
});

app.listen(port, function() {
    console.log("listening on port ", port);
});

module.exports = app;
