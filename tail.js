const MovingWindow = require('./src/tailLib.js');

const readInput = function(numberLine) {
  const tail = new MovingWindow(numberLine);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    const lines = data.trim().split('\n');
    lines.map(line => tail.addLine(line));
  });
  process.stdin.on('end', () => {
    process.stdout.write(tail.getLines().join('\n'));
  });
};

const main = function(options) {
  let usrArgs = [...options];
  let numberLine = 10;
  readInput(numberLine);
};

main(process.argv.slice(2));
