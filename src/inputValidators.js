const getN = function(usrArgs, err) {
  const index = usrArgs.indexOf('-n');
  if (index == -1) return 10;
  return usrArgs[index + 1];
};

// const validateN = function(usrArgs) {
//   const index = usrArgs.indexOf('-n');
//   return (
//     index == usrArgs.lastIndexOf('-n') && Number.isInteger(usrArgs[index + 1])
//   );
// };

const errors = {
  usage: `usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]`,
  tail: [`tail: option requires an argument -- n`, `tail: illegal offset -- -n`]
};

class errorMsg {
  constructor() {
    this.error = [];
  }
  getError() {
    return this.error;
  }
  isValidN(usrArgs) {
    const index = usrArgs.indexOf('-n');
    return (
      index == usrArgs.lastIndexOf('-n') && Number.isInteger(usrArgs[index + 1])
    );
  }
  validateN(usrArgs) {
    if (this.isValidN(usrArgs)) {
      return;
    }
    if (Number.isInteger(usrArgs[index + 1])) {
      this.error.push(errors.tail[0], errors.usage);
    }
  }
}

module.exports = { getN, errorMsg };
