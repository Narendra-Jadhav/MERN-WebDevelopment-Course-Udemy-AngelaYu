//jshint esversion:6
// above comment(for linter) if const gives warning

// const fs = require("fs");
// by 'const' we cannot change the value of that afterwards
// require method is used to use the "File System" Module from NodeJS

// fs.copyFileSync("file1.txt", "file2.txt");
// File System Module has this method to copy One file's content into other

// NOTE: Once written, running the file index.js in Hyper Terminal by -> node index.js


// ----------------------------------------------------

var superheroes = require("superheroes");

var mySuperheroName = superheroes.random();
// random is the pre-defined function/method of the module

console.log(mySuperheroName);

// running the code in terminal by -> node index.js

var supervillains = require("supervillains");

var mySupervillainName = supervillains.random();

console.log(mySupervillainName);
