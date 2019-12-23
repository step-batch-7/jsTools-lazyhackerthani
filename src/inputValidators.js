const getN = function(usrArgs, err) {
  const index = usrArgs.indexOf('-n');
  if (index == -1) return 10;
  if (!err.isValidN(usrArgs)) {
    return 0;
  }
  return +usrArgs[index + 1];
};

const isPositiveInteger = function(s) {
  return /^\+?[1-9][\d]*$/.test(s);
};

const errors = {
  usage: `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`,
  tail: [`tail: option requires an argument -- n`, `tail: illegal offset -- -n`]
};

class errorMsg {
  constructor(usrArgs) {
    this.error = [];
    this.validateN(usrArgs);
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
  validateN(usrArgs) {
    const index = usrArgs.indexOf('-n');
    const valid = this.isValidN(usrArgs);
    if (!isPositiveInteger(+usrArgs[index + 1])) {
      this.error.push(errors.tail[0], errors.usage);
    }
    return valid;
  }
}

module.exports = { getN, errorMsg };
