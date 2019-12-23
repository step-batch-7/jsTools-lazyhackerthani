const Tail = require('./src/tailLib.js');

const main = function(options) {
  const tail = new Tail();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', line => {
    tail.addLine(line);
  });
  process.stdin.on('end', () => console.log(tail.getLines().join('\n')));
  return 0;
};

main(process.argv.slice(2));
