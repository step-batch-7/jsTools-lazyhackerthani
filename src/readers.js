const MovingWindow = require('../src/movingWindow.js');
const emptyString = '';

const executeTail = function(parsedOptions, readerStreams, callBack) {
  if (parsedOptions.hasError) {
    callBack('', parsedOptions.errorMsg.join('\n'));
  }
  if (Array.isArray(parsedOptions.files)) {
    readEndLines(parsedOptions.numberLine, readerStreams.inputStream, callBack);
  }
};

const readEndLines = function(options, readStream, onComplete) {
  const tail = new MovingWindow(options);
  readStream.setEncoding('utf8');
  readStream.on('data', onData.bind(tail));
  readStream.on('end', () => {
    onComplete(tail.getLines().join('\n'), emptyString);
  });
};

const onData = function(dataLine) {
  const lines = dataLine.trim().split('\n');
  lines.forEach(line => this.addLine(line));
};

module.exports = { readEndLines, onData, executeTail };
