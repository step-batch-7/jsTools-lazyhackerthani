class StreamDecider {
  constructor(stdin, fileStreamCreator) {
    this.stdin = stdin;
    this.fileStreamCreator = fileStreamCreator;
  }
  decide(fileName) {
    return fileName ? this.fileStreamCreator(fileName) : this.stdin;
  }
}

module.exports = StreamDecider;
