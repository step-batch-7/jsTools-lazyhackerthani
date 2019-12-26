const getNumberLineValue = function(usrArgs, indexOfN) {
  return JSON.parse(usrArgs[indexOfN + 1]);
};

const parseUserArgs = function(userArgs, functionReferences) {
  let userArgsCp = [...userArgs];
  let numberLine = 10;
  if (userArgs[0] == '-n') {
    numberLine = getNumberLineValue(userArgs, 0);
    userArgsCp = userArgsCp.slice(2);
  }
  return {
    options: { n: numberLine },
    isValid: true,
    funcRef: functionReferences[0]
  };
};

module.exports = { parseUserArgs, getNumberLineValue };
