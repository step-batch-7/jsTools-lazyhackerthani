const assert = require('chai').assert;
const Tail = require('../src/tail.js');

describe('Tail', function() {
  describe('getLines', function() {
    it('should give lines', function() {
      const tail = new Tail();
      assert.deepStrictEqual(tail.getLines(), []);
    });
  });
  describe('addLine', function() {
    it('should add new line', function() {
      const tail = new Tail();
      tail.addLine('this is new line');
      assert.deepStrictEqual(tail.getLines(), ['this is new line']);
    });
  });
});
