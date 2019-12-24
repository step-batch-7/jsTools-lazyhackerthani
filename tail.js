const Tail = require('./src/tailLib.js');
const { getN, Error } = require('./src/inputValidators.js');
const { getTail } = require('./src/asynchronousData.js');

const main = function(options) {
  getTail(options);
  return 0;
};

main(process.argv.slice(2));
