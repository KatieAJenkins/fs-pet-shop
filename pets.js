'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
// console.log(__dirname);

var node = console.log(path.basename(process.argv[0]));

var file = path.basename(process.argv[1]);
console.log(file);
var cmd = process.argv[2];
console.log(cmd);
var index = process.argv[3];
console.log(index);

if (cmd === 'read'){
fs.readFile(petsPath, 'utf8', function (err, data) {
  if (err) {
    throw err;
  }
  // var pets = data[1];
  var pets = JSON.parse(data);
  console.log(pets[index]);
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);

};
