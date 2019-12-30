class MovingWindow {
  constructor(numberLine) {
    this.numberLine = numberLine || 10;
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
