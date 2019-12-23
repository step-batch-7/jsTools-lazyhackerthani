const assert = require('chai').assert;
const Tail = require('../src/tailLib.js');

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
    it('should give ending n lines for given n', function() {
      const tail = new Tail(1);
      tail.addLine('this is first line');
      assert.deepStrictEqual(tail.getLines(), ['this is first line']);
      assert.deepStrictEqual();
    });
    it('should give only ending n lines for given more than n lines', function() {
      const tail = new Tail(1);
      tail.addLine('this is first line');
      tail.addLine('this is second line');
      assert.deepStrictEqual(tail.getLines(), ['this is second line']);
      assert.deepStrictEqual();
    });
  });
});
