'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
// console.log(__dirname);

var node = path.basename(process.argv[0]);
// console.log(node);
var file = path.basename(process.argv[1]);
// console.log(file);
var cmd = process.argv[2];
// console.log(cmd);
var index = process.argv[3];
// console.log(index);
// var age = process.argv[4];
// console.log(age);

if (cmd === 'read'){
fs.readFile(petsPath, 'utf8', function (err, data) {
  if (err) {
    throw err;
  }
  //logs entire pet object
  var pets = JSON.parse(data);
  console.log(pets);

  if (index < 0 || index > pets.length - 1) {
    console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
    process.exit(1);
  }
    //logs index of pets //??????? May need to fix!
    console.log(pets[index]);
  });
}

else if (cmd === 'create'){
  fs.readFile(petsPath, 'utf8', function (readErr, data){
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    console.log(pets);

    var age = process.argv[4];
    console.log(age);
    // var kind = process.argv[5];
    // var name = process.argv[6];

    if (!age || !kind || !name){
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit (1);
    }
    // pets.push(age);
    //
    // var petsJSON = JSON.stringify(pets);
    //
    // fs.writeFile(petsPath, petsJSON, function(writeErr) {
    //   if (writeErr) {
    //     throw writeErr;
    //   }
    //   console.log(age);
    // });
  });
  }

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
