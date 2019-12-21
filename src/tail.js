class Tail {
  constructor(n = 10) {
    this.n = n;
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

module.exports = Tail;
