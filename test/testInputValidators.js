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
  it('should validateN when it has only one -n and has a integer value after that', function() {
    assert.isTrue(validateN(['-n', 5]));
  });
});
