class MovingWindow {
  constructor(numberLine) {
    const defaultNumberLine = 10;
    this.numberLine = numberLine || defaultNumberLine;
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
