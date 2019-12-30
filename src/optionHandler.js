const parseUserArgs = function(userArgs, index = 0) {
  let isValid = { hasError: false };
  const currOption = userArgs[index];
  if (!/^-/.test(currOption) || userArgs.length <= 0) {
    return Object.assign(isValid, { files: userArgs.slice(index) });
  }
  if (/^-[n]\d?$/.test(currOption)) {
    const option = currOption.charAt(1);
    const value = currOption.slice(2) || userArgs[++index];
    isValid = isValidOptionValue(option, value);
  }
  if (isValid.hasError) {
    return isValid;
  }
  return Object.assign(isValid, parseUserArgs(userArgs, index + 1));
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

module.exports = { parseUserArgs, isValidOptionValue };
