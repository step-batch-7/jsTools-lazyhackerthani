const { parseUserArgs } = require('./src/optionHandler.js');
const { readEndLines } = require('./src/readers.js');
const { stdin, stdout } = process;

const main = function(cmdLineArgs) {
  const printTail = (contents, err) => {
    //stdout.error(err);
    stdout.write(contents);
  };
  readEndLines(parseUserArgs(cmdLineArgs)['numberLine'], stdin, printTail);
};

main(process.argv.slice(2));
