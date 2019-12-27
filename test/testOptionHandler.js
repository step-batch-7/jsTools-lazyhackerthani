const assert = require('chai').assert;
const {
  getNumberLineValue,
  parseUserArgs
} = require('../src/optionHandler.js');

describe('getNumberLineValue', function() {
  it('should give n value from user args', function() {
    assert.deepStrictEqual(getNumberLineValue(['-n', '5'], 0), 5);
  });
});

describe('parseUserArgs', function() {
  it('should give option values and function reference to call in an object', function() {
    const fileNotPresent = () => {};
    assert.deepStrictEqual(parseUserArgs(['-n', '5']), {
      options: {
        n: 5
      }
    });
  });
  it('should give option values and function reference to call,option as default value', function() {
    const fileNotPresent = () => {};
    assert.deepStrictEqual(parseUserArgs([]), { options: { n: 10 } });
  });
});
