class MovingWindow {
  constructor(options) {
    this.n = options.n;
    this.lines = [];
  }
  getLines() {
    return this.lines;
  }
  addLine(lineToAdd) {
    this.lines.push(lineToAdd);
    if (this.lines.length > this.n) this.lines.shift();
  }
}

module.exports = MovingWindow;
