const assert = require('chai').assert;
const EventEmitter = require('events').EventEmitter;
const MovingWindow = require('../src/movingWindow.js');
const { readInput, onData } = require('../src/readers.js');

describe('onData', function() {
  it('should add the given dataLine to tail object bounded to it', function() {
    const tail = new MovingWindow({ n: 10 });
    onData.call(tail, 'a\nb\n');
    const actual = tail.getLines();
    assert.deepStrictEqual(actual, ['a', 'b']);
  });
  it('should add the given dataLine to tail object bounded to it and give ', function() {
    const tail = new MovingWindow({ n: 2 });
    onData.call(tail, 'a\nb\nc\n');
    const actual = tail.getLines();
    assert.deepStrictEqual(actual, ['b', 'c']);
  });
  it('should add the given dataLine to tail object bounded to it and give ', function() {
    const tail = new MovingWindow({ n: 4 });
    onData.call(tail, '1\n2\n3\n');
    onData.call(tail, 'a\nb\nc\n');
    const actual = tail.getLines();
    assert.deepStrictEqual(actual, ['3', 'a', 'b', 'c']);
  });
});

describe('readInput', function() {
  it('should readInput from given event listener and do operations on it', function() {
    const EE = new EventEmitter();
    EE.setEncoding = encode => {
      assert.equal(encode, 'utf8');
    };
    const dummyPrint = function(content) {
      assert.deepStrictEqual(content, '1\n2\n3');
    };
    readInput({ n: 10 }, EE, dummyPrint);
    EE.emit('data', '1\n2\n3\n');
    EE.emit('end');
  });
});
