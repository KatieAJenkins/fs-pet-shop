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

if (cmd === 'read'){
fs.readFile(petsPath, 'utf8', function (err, data) {
  if (err) {
    throw err;
  }
  //logs entire pet object
  var pets = JSON.parse(data);
  console.log(pets);

 if (index < 0 || index > pets.length - 1) {
    console.error(`Usage: ${node} ${file} read INDEX`);
    process.exit(1);
  }
    //logs index of pets
  console.log(pets[index]);
});
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
