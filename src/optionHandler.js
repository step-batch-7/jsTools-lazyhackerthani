const getNumberLineValue = function(usrArgs, indexOfN = 0) {
  return +usrArgs[++indexOfN];
};

const parseUserArgs = function(userArgs) {
  let numberLine = 10;
  const initialIndex = 0;
  if (userArgs[initialIndex] === '-n') {
    numberLine = getNumberLineValue(userArgs, initialIndex);
  }
  return { options: { numberLine } };
};

module.exports = { parseUserArgs, getNumberLineValue };
