const getNumberLineValue = function(usrArgs, indexOfN) {
  return +usrArgs[indexOfN++];
};

const parseUserArgs = function(userArgs) {
  let numberLine = 10;
  const initialIndex = 0;
  if (userArgs[initialIndex] === '-n') {
    numberLine = getNumberLineValue(userArgs, initialIndex);
  }
  return { options: { numberLine: numberLine } };
};

module.exports = { parseUserArgs, getNumberLineValue };
