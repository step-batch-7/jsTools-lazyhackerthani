const assert = require('chai').assert;
const {
  getNumberLineValue,
  parseUserArgs,
  isValidOptionValue
} = require('../src/optionHandler.js');

describe('getNumberLineValue', function() {
  it('should give n value from user args', function() {
    assert.deepStrictEqual(getNumberLineValue(['-n', '5'], 0), 5);
  });
});

describe('parseUserArgs', function() {
  it('should give option values and function reference to call in an object', function() {
    assert.deepStrictEqual(parseUserArgs(['-n', '5']), {
      options: {
        numberLine: 5
      }
    });
  });
  it('should give option values and function reference to call,option as default value', function() {
    assert.deepStrictEqual(parseUserArgs([]), { options: { numberLine: 10 } });
  });
});

describe('isValidOptionValue', function() {
  it('should validate and give an object saying hasError as false and option as key and value to it', function() {
    const actual = isValidOptionValue('-n', 2);
    const expected = { hasError: false, '-n': 2 };
    assert.deepStrictEqual(actual, expected);
  });
  it('should validate and give an object saying hasError as false and option as key and value to it even no is string format', function() {
    const actual = isValidOptionValue('-n', '2');
    const expected = { hasError: false, '-n': 2 };
    assert.deepStrictEqual(actual, expected);
  });
  it('should invalidate and give an object saying hasError as true and errorMsg', function() {
    const actual = isValidOptionValue('-n', 'w');
    const expected = { hasError: true, errorMsg: `tail: illegal offset -w` };
    assert.deepStrictEqual(actual, expected);
  });
});
