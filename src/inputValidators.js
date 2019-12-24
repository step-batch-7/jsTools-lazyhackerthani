const getN = function(usrArgs) {
  return +usrArgs[usrArgs.indexOf('-n') + 1];
};

const isPositiveInteger = function(s) {
  return /^\+?[1-9][\d]*$/.test(s);
};

const errors = {
  usage: `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`,
  tail: [`tail: option requires an argument -- n`, `tail: illegal offset -- -n`]
};

class Error {
  constructor() {
    this.error = [];
  }
  addError(errMsg) {
    this.error.push(errMsg);
  }
  getError() {
    return this.error;
  }
  isValidN(usrArgs) {
    const index = usrArgs.indexOf('-n');
    return (
      index == usrArgs.lastIndexOf('-n') &&
      isPositiveInteger(+usrArgs[index + 1])
    );
  }
  validateOption(usrArgs) {
    const index = usrArgs.indexOf('-n');
    const valid = this.isValidN(usrArgs);
    if (!isPositiveInteger(+usrArgs[index + 1])) {
      this.error.push(errors.tail[0], errors.usage);
    }
    return valid;
  }
}

module.exports = { getN, Error };
