const readInput = function(options) {
  const tail = new MovingWindow(options);
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', data => {
    const lines = data.trim().split('\n');
    lines.forEach(line => tail.addLine(line));
  });
  process.stdin.on('end', () => {
    process.stdout.write(tail.getLines().join('\n'));
  });
};
