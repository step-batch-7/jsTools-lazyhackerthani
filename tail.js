const { parseUserArgs } = require('./src/optionHandler.js');
const { readInput } = require('./src/readers.js');
const { stdin, stdout } = process;

const main = function(cmdLineArgs) {
  const printTail = contents => {
    stdout.write(contents);
  };
  readInput(parseUserArgs(cmdLineArgs).options, stdin, printTail);
};

main(process.argv.slice(2));
