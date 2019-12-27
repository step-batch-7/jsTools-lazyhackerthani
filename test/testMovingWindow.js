const assert = require('chai').assert;
const MovingWindow = require('../src/movingWindow.js');

describe('MovingWindow', function() {
  describe('getLines', function() {
    it('should give lines', function() {
      const tail = new MovingWindow({});
      assert.deepStrictEqual(tail.getLines(), []);
    });
  });
  describe('addLine', function() {
    it('should add new line', function() {
      const tail = new MovingWindow({});
      tail.addLine('this is new line');
      assert.deepStrictEqual(tail.getLines(), ['this is new line']);
    });
    it('should give ending n lines for given n', function() {
      const tail = new MovingWindow({ n: 1 });
      tail.addLine('this is first line');
      assert.deepStrictEqual(tail.getLines(), ['this is first line']);
    });
    it('should give only ending n lines for given more than n lines', function() {
      const tail = new MovingWindow({ n: 1 });
      tail.addLine('this is first line');
      tail.addLine('this is second line');
      assert.deepStrictEqual(tail.getLines(), ['this is second line']);
    });
  });
});