const assert = require('chai').assert;
const {
  parseUserArgs,
  isValidOptionValue
} = require('../src/optionHandler.js');

describe('parseUserArgs', function() {
  it('should give option values and files in an object', function() {
    const expected = { hasError: false, n: 5, files: [] };
    assert.deepStrictEqual(parseUserArgs(['-n', '5']), expected);
  });
  it('should give option values and files,option which is given', function() {
    const actual = parseUserArgs([]);
    const expected = { hasError: false, files: [] };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give option values and files,hasError should be true if one in the list is invalid', function() {
    const actual = parseUserArgs(['-n', 'w', '-n', '5']);
    const expected = { hasError: true, errorMsg: `tail: illegal offset -w` };
    assert.deepStrictEqual(actual, expected);
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
