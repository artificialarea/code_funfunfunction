/* 

TASK:
import and convert raw text string (data.txt) into structured data object

src: https://www.youtube.com/watch?v=1DMolJ2FrNY&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84&index=4

*/


// import fs from 'fs';
const fs = require('fs'); // [^2]

var output = fs.readFileSync('data.txt', 'utf8')
    // and now for some chaining...
    .trim()
    .split('\n') // split by line
    .map(line => line.split('\t')) // split by tab, also [^3]
    // .reduce(() => {}, {}) // two params: a callback function and an initial value starting object
    .reduce((customers, line) => {
        // customers[line[0]] = [];
        customers[line[0]] = customers[line[0]] || []; // need an `or` operator, otherwise the key values are overridden 
        customers[line[0]].push({
            product: line[1],
            price: line[2],
            quantity: line[3]
        })
        return customers;
    }, {}); 

console.log(JSON.stringify(output, null, 2));



/* 
FOOTNOTES

[1]: executing node ////////////////
initially tried to do this via an absolute path at the root directory
$ node functional_programming/04_reduce_advanced/reduce-02.js
... but it doesn't work because node tries to search 'functional_programming/data.txt' and thus doesn't find it

stack overflow informed me I need to run node directly from within the said directory
$ cd functional_programming/04_reduce_advanced
then
$ node reduce-02.js


[^2]: ES6 import vs CommonJS require syntax /////////////
not sure why, but ES6 `import` wouldn't work so needed to use CommonJS `require` syntax

[^3]: btw, to register tab seperatation for data.txt I needed to do it via regexr.com because vscode converts tabs into spaces and thus \t wasn't recognized

*/