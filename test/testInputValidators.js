const assert = require('chai').assert;
const { getN, validateN } = require('../src/inputValidators.js');

describe('getN', function() {
  it('should give n value from user args', function() {
    assert.deepStrictEqual(getN(['-n', 5]), 5);
  });
  it('should give undefined when there is no -n option present', function() {
    assert.strictEqual(getN([]), undefined);
  });
});

describe('validateN', function() {
  it('should validate when it has only one -n and has a integer value after that', function() {
    assert.isTrue(validateN(['-n', 5]));
  });
  it('should invalidate when it has only one -n and has a non integer value after that', function() {
    assert.isFalse(validateN(['-n', 5.3]));
  });
  it('should invalidate when it has only one -n and has a string value after that', function() {
    assert.isFalse(validateN(['-n', 'd']));
    assert.isFalse(validateN(['-n', '-n']));
  });
});
