const getNumberLineValue = function(usrArgs, indexOfN) {
  return +usrArgs[indexOfN + 1];
};

const parseUserArgs = function(userArgs) {
  let numberLine = 10;
  if (userArgs[0] == '-n') {
    numberLine = getNumberLineValue(userArgs, 0);
  }
  return { options: { n: numberLine } };
};

module.exports = { parseUserArgs, getNumberLineValue };
