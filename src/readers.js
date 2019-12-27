const MovingWindow = require('../src/movingWindow.js');

const readEndLines = function(options, readStream, onComplete) {
  const tail = new MovingWindow(options);
  readStream.setEncoding('utf8');
  readStream.on('data', onData.bind(tail));
  readStream.on('end', () => {
    onComplete(tail.getLines().join('\n'));
  });
};

const onData = function(dataLine) {
  const lines = dataLine.trim().split('\n');
  lines.forEach(line => this.addLine(line));
};

module.exports = { readEndLines, onData };
