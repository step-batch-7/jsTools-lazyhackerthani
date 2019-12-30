const { parseUserArgs } = require('./src/optionHandler.js');
const { readEndLines } = require('./src/readers.js');
const { stdin, stdout } = process;

const main = function(cmdLineArgs) {
  const printTail = contents => {
    stdout.write(contents);
  };
  readEndLines(parseUserArgs(cmdLineArgs)['n'], stdin, printTail);
};

main(process.argv.slice(2));
