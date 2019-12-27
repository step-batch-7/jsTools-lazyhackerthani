const MovingWindow = require('../src/movingWindow.js');

const readInput = function(options, stdin, printResult) {
  const tail = new MovingWindow(options);
  stdin.setEncoding('utf8');
  stdin.on('data', onData.bind(tail));
  stdin.on('end', () => {
    printResult(tail.getLines().join('\n'));
  });
};

const onData = function(dataLine) {
  const lines = dataLine.trim().split('\n');
  lines.forEach(line => this.addLine(line));
};

module.exports = { readInput, onData };
