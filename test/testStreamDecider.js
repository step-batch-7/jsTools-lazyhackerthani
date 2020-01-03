const assert = require('chai').assert;
const { fake } = require('sinon');
const StreamDecider = require('../src/streamDecider.js');

describe('StreamDecider', function () {
  describe('decide', function () {
    let fakeStdIn, fakeReadStreamCreator;
    beforeEach(() => {
      fakeStdIn = {};
      fakeReadStreamCreator = fake.returns({});
    });
    it('should give stdin when fileName not present', function () {
      const streamDecider = new StreamDecider(fakeStdIn, fakeReadStreamCreator);
      assert.deepStrictEqual(streamDecider.decide(), fakeStdIn);
    });
    it('should give readStream when fileName not present', function () {
      const streamDecider = new StreamDecider(fakeStdIn, fakeReadStreamCreator);
      assert.deepStrictEqual(streamDecider.decide('someFile.txt'), fakeReadStreamCreator());
    });
  });
});
