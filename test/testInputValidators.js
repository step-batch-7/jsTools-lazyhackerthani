const assert = require('chai').assert;
const { getN, Error } = require('../src/inputValidators.js');

describe('getN', function() {
  it('should give n value from user args', function() {
    assert.deepStrictEqual(getN(['-n', '5'], new Error()), 5);
  });
});

describe('description for func to test', function() {
  describe('isValidN', function() {
    const err = new Error();
    it('should validate when it has only one -n and has a integer value after that', function() {
      assert.isTrue(err.isValidN(['-n', 5]));
    });
    it('should invalidate when it has only one -n and has a non integer value after that', function() {
      assert.isFalse(err.isValidN(['-n', 5.3]));
    });
    it('should invalidate when it has only one -n and has a string value after that', function() {
      assert.isFalse(err.isValidN(['-n', 'd']));
      assert.isFalse(err.isValidN(['-n', '-n']));
    });
    it('should invalidate when it has only one -n and not have integer value after that', function() {
      assert.isFalse(err.isValidN(['-n']));
    });
    it('should invalidate when it has more than one -n and has a integer value after first -n', function() {
      assert.isFalse(err.isValidN(['-n', 5, '-n']));
    });
    it('should invalidate when it has more than one -n and has a integer value after both -n', function() {
      assert.isFalse(err.isValidN(['-n', 5, '-n', 3]));
    });
    it('should invalidate when it has more than one -n and has a integer value after second -n', function() {
      assert.isFalse(err.isValidN(['-n', '-n', 3]));
    });
  });

  describe('getError', function() {
    it('should give error', function() {
      const err = new Error();
      assert.deepStrictEqual(err.getError(), []);
    });
  });

  describe('validateOption', function() {
    it('should validate N and add nothing to error object', function() {
      const err = new Error();
      err.validateOption(['-n', 5]);
      assert.deepStrictEqual(err.getError(), []);
    });
    it('should validate N and add error to error object', function() {
      const err = new Error();
      err.validateOption(['-n']);
      assert.deepStrictEqual(err.getError(), [
        `tail: option requires an argument -- n`,
        `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`
      ]);
    });
  });
});
