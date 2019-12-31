const assert = require('chai').assert;
const { spy, stub } = require('sinon');
const MovingWindow = require('../src/movingWindow.js');
const { readEndLines, onData, executeTail } = require('../src/readers.js');
const emptyString = '';

describe('onData', function() {
  it('should add the given dataLine to tail object bounded to it', function() {
    const tail = new MovingWindow(10);
    onData.call(tail, 'a\nb\n');
    const actual = tail.getLines();
    assert.deepStrictEqual(actual, ['a', 'b']);
  });
  it('should add the given dataLine to tail object bounded to it and give ', function() {
    const tail = new MovingWindow(2);
    onData.call(tail, 'a\nb\nc\n');
    const actual = tail.getLines();
    assert.deepStrictEqual(actual, ['b', 'c']);
  });
  it('should add the given dataLine to tail object bounded to it and give ', function() {
    const tail = new MovingWindow(4);
    onData.call(tail, '1\n2\n3\n');
    onData.call(tail, 'a\nb\nc\n');
    const actual = tail.getLines();
    assert.deepStrictEqual(actual, ['3', 'a', 'b', 'c']);
  });
});

describe('readEndLines', function() {
  it('should readInput from given event listener and do operations on it when onData invoke once with multi line data', function(done) {
    const dummyReadStream = {};
    let invokeOnData, invokeOnEnd;
    dummyReadStream.on = stub((name, callback) => {
      if (name == 'data') invokeOnData = callback;
      if (name == 'end') invokeOnEnd = callback;
    });

    dummyReadStream.setEncoding = spy();
    readEndLines({ numberLine: 10 }, dummyReadStream, content => {
      assert(dummyReadStream.setEncoding.calledWith('utf8'));
      assert.deepStrictEqual(content, '1\n2\n3');
      done();
    });
    invokeOnData('1\n2\n3\n');
    invokeOnEnd();
  });
  it('should readInput from given event listener and do operations on it when onData invoke once with single line data', function(done) {
    const dummyReadStream = {};
    let invokeOnData, invokeOnEnd;
    dummyReadStream.on = stub((name, callback) => {
      if (name == 'data') invokeOnData = callback;
      if (name == 'end') invokeOnEnd = callback;
    });

    dummyReadStream.setEncoding = spy();
    readEndLines({ numberLine: 10 }, dummyReadStream, (content, err) => {
      assert.strictEqual(err, emptyString);
      assert(dummyReadStream.setEncoding.calledWith('utf8'));
      assert.deepStrictEqual(content, '1');
      done();
    });
    invokeOnData('1');
    invokeOnEnd();
  });
  it('should readInput from given event listener and do operations on it when onData invoke multiple times with single line data', function(done) {
    const dummyReadStream = {};
    let invokeOnData, invokeOnEnd;
    dummyReadStream.on = stub((name, callback) => {
      if (name == 'data') invokeOnData = callback;
      if (name == 'end') invokeOnEnd = callback;
    });

    dummyReadStream.setEncoding = spy();
    readEndLines({ numberLine: 10 }, dummyReadStream, (content, err) => {
      assert.strictEqual(err, emptyString);
      assert(dummyReadStream.setEncoding.calledWith('utf8'));
      assert.deepStrictEqual(content, '1\n2');
      done();
    });
    invokeOnData('1');
    invokeOnData('2');
    invokeOnEnd();
  });
});

describe('executeTail', function() {
  it('should execute tail operation with inputStream for valid option without files', function(done) {
    const dummyReadStream = {};
    let invokeOnData, invokeOnEnd;
    dummyReadStream.on = stub((name, callback) => {
      if (name == 'data') invokeOnData = callback;
      if (name == 'end') invokeOnEnd = callback;
    });

    dummyReadStream.setEncoding = spy();
    executeTail(
      { hasError: false, numberLine: 5, files: [] },
      { inputStream: dummyReadStream },
      (content, err) => {
        assert.strictEqual(err, emptyString);
        assert(dummyReadStream.setEncoding.calledWith('utf8'));
        assert.deepStrictEqual(content, '1\n2');
        done();
      }
    );
    invokeOnData('1');
    invokeOnData('2');
    invokeOnEnd();
  });

  it('should give error for invalid option', function(done) {
    const fakeReadStream = {};
    const parsedOption = {
      hasError: true,
      errorMsg: [`tail: illegal offset -w`]
    };
    executeTail(
      parsedOption,
      { inputStream: fakeReadStream },
      (content, err) => {
        assert.strictEqual(content, emptyString);
        assert.strictEqual(err, parsedOption.errorMsg.join('\n'));
        done();
      }
    );
  });
});
