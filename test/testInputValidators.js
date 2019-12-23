const assert = require('chai').assert;
const { getN } = require('../src/inputValidators.js');

describe('getN', function() {
  it('should give n value from user args', function() {
    assert.deepStrictEqual(getN(['-n', 5]), 5);
  });
});
