const fs = require('fs');
const readline = require('readline');
const Tail = require('./tailLib.js');
const { getN, Error } = require('../src/inputValidators.js');

////////not used yet
// const readFile = function(n, usrArgs) {
//   if (usrArgs.length <= 0) process.exit();
//   const path = usrArgs.shift();
//   const tail = new Tail(n);
//   if (fs.existsSync(path)) {
//     const readInterface = readline.createInterface({
//       input: fs.createReadStream(path),
//       console: false
//     });

//     readInterface.on('line', function(line) {
//       tail.addLine(line);
//     });
//     readInterface.on('close', () => {
//       console.log(tail.getLines());
//       //readFile(n, usrArgs);
//     });
//   } else {
//     console.error(`tail: ${path}: No such file or directory`);
//   }
// };
//////////////////////

const readInput = function(n) {
  const tail = new Tail(n);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', line => {
    tail.addLine(line);
  });
  process.stdin.on('end', () => {
    console.log(tail.getLines().join('\n'));
  });
};

//////////////////

const getTail = function(options) {
  let usrArgs = [...options];
  let n = 10;
  const err = new Error();
  if (!err.validateOption(usrArgs)) {
    console.error(err.getError().join('\n'));
    process.exit();
  }
  if (usrArgs[0] == '-n') {
    n = getN(usrArgs, err);
    usrArgs = usrArgs.slice(2);
  }
  readInput(n);
  //readFile(n, usrArgs);
};

module.exports = { getTail };
