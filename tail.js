const { parseUserArgs } = require('./src/optionHandler.js');
const { executeTail } = require('./src/readers.js');
const { stdin, stdout } = process;

const main = function(cmdLineArgs) {
  const printTail = (contents, err) => {
    //stdout.error(err);
    stdout.write(contents);
  };
  executeTail(parseUserArgs(cmdLineArgs), { inputStream: stdin }, printTail);
};

main(process.argv.slice(2));
