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

const isValidOptionValue = function(validOption, optionValue) {
  const validOptionAndValue = {};
  validOptionAndValue.hasError = !Number.isInteger(+optionValue);
  if (validOptionAndValue.hasError) {
    validOptionAndValue.errorMsg = `tail: illegal offset -${optionValue}`;
    return validOptionAndValue;
  }
  validOptionAndValue[validOption] = +optionValue;
  return validOptionAndValue;
};

module.exports = { parseUserArgs, getNumberLineValue, isValidOptionValue };
