const MovingWindow = require('./src/tailLib.js');
const { parseUserArgs } = require('./src/optionHandler.js');
const readInput = function(options) {
  const tail = new MovingWindow(options);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    const lines = data.trim().split('\n');
    lines.map(line => tail.addLine(line));
  });
  process.stdin.on('end', () => {
    process.stdout.write(tail.getLines().join('\n'));
  });
};

const main = function(userOptions) {
  const essence = parseUserArgs(userOptions, [readInput]);
  essence.funcRef(essence.options);
};

main(process.argv.slice(2));
