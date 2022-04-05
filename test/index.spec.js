const expect = require('must');

const blockedWords = ['alfonso', 'hubertus', 'karl'];
const checkForBlockedWords = tweet => blockedWords.some(word => tweet.toLowerCase().includes(word));

describe('checkForBlockedWords', () => {
  it('filters tweets with words like alfonse, hubertus or karl', () => {
    expect(checkForBlockedWords('Alfonso von Hohenlohe')).to.be(true)
  });
});