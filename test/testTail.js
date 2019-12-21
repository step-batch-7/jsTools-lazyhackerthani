const assert = require('chai').assert;
const Tail = require('../src/tail.js');

describe('Tail', function() {
  describe('getLines', function() {
    it('should give lines', function() {
      const tail = new Tail();
      assert.deepStrictEqual(tail.getLines(), []);
    });
  });
});
