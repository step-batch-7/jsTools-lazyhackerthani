const getN = function(usrArgs) {
  return usrArgs[usrArgs.indexOf('-n') + 1];
};

const validateN = function(usrArgs) {
  const index = usrArgs.indexOf('-n');
  return (
    index == usrArgs.lastIndexOf('-n') && Number.isInteger(usrArgs[index + 1])
  );
};

class errorMsg {
  constructor() {
    const errors = {
      usage: `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`,
      tail: [
        `tail: option requires an argument -- n`,
        `tail: illegal offset -- -n`
      ]
    };
    this.error;
  }
}
module.exports = { getN, validateN };
