class MovingWindow {
  constructor(options) {
    this.numberLine = options.numberLine;
    this.lines = [];
  }
  getLines() {
    return this.lines;
  }
  addLine(lineToAdd) {
    this.lines.push(lineToAdd);
    if (this.lines.length > this.numberLine) {
      this.lines.shift();
    }
  }
}
module.exports = MovingWindow;
