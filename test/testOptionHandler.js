const assert = require('chai').assert;
const {
  isValidValue,
  isValidOption,
  isValidOptionAndValue,
  parseUserArgs
} = require('../src/optionHandler.js');

describe('parseUserArgs', function() {
  it('should give option values and files in an object', function() {
    const actual = parseUserArgs(['-n', '5']);
    const expected = { hasError: false, numberLine: 5, files: [] };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give option values and files,option which is given', function() {
    const actual = parseUserArgs([]);
    const expected = { hasError: false, files: [] };
    assert.deepStrictEqual(actual, expected);
  });
  it('should give option values and files,hasError should be true if one in the list is invalid', function() {
    const actual = parseUserArgs(['-n', 'w', '-n', '5']);
    const expected = { hasError: true, errorMsg: [`tail: illegal offset -w`] };
    assert.deepStrictEqual(actual, expected);
  });
  it('should invalidate option if its invalid and give usage error also', function() {
    const actual = parseUserArgs(['-h', '2', '-n', '5']);
    const expected = {
      hasError: true,
      errorMsg: [
        `tail: illegal option -- h`,
        `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
      ]
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('isValidValue', function() {
  it('should validate and give an object saying hasError as false and option as key and value to it', function() {
    const actual = isValidValue('numberLine', 2);
    const expected = { hasError: false, numberLine: 2 };
    assert.deepStrictEqual(actual, expected);
  });
  it('should validate and give an object saying hasError as false and option as key and value to it even no is string format', function() {
    const actual = isValidValue('numberLine', '2');
    const expected = { hasError: false, numberLine: 2 };
    assert.deepStrictEqual(actual, expected);
  });
  it('should invalidate and give an object saying hasError as true and errorMsg', function() {
    const actual = isValidValue('numberLine', 'w');
    const expected = { hasError: true, errorMsg: [`tail: illegal offset -w`] };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('isValidOption', function() {
  it('should  validate option and give a object with hasError false', function() {
    const actual = isValidOption('n');
    const expected = { hasError: false };
    assert.deepStrictEqual(actual, expected);
  });
  it('should invalidate option and give errorMsg', function() {
    const actual = isValidOption('h');
    const expected = {
      hasError: true,
      errorMsg: [
        `tail: illegal option -- h`,
        `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
      ]
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('isValidOptionAndValue', function() {
  it('should validate option even numeric value in string', function() {
    const actual = isValidOptionAndValue('n', '5');
    const expected = { hasError: false, numberLine: 5 };
    assert.deepStrictEqual(actual, expected);
  });
  it('should invalidate option if its invalid and give usage error also', function() {
    const actual = isValidOptionAndValue('h', '2');
    const expected = {
      hasError: true,
      errorMsg: [
        `tail: illegal option -- h`,
        `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
      ]
    };
    assert.deepStrictEqual(actual, expected);
  });
  it('should invalidate value and give an object saying hasError as true and errorMsg', function() {
    const actual = isValidOptionAndValue('n', 'w');
    const expected = { hasError: true, errorMsg: [`tail: illegal offset -w`] };
    assert.deepStrictEqual(actual, expected);
  });
});
