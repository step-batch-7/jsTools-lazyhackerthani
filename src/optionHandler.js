const processUserOptions = function(userArgs, isValid, index) {
  const currOption = userArgs[index];
  if (!/^-/.test(currOption)) {
    return Object.assign(isValid, { files: userArgs.slice(index) });
  }
  let optionPosition = 1;
  const option = currOption.charAt(optionPosition);
  const value = currOption.slice(++optionPosition) || userArgs[++index];
  isValid = isValidOptionAndValue(option, value);
  if (isValid.hasError) {
    return isValid;
  }
  return processUserOptions(userArgs, isValid, ++index);
};

const isValidOptionAndValue = function(userOption, value) {
  const isValid = isValidOption(userOption);
  if (isValid.hasError) {
    return isValid;
  }
  const options = { n: 'numberLine' };
  return isValidValue(options[userOption], value);
};

const isValidOption = function(option) {
  const isValid = { hasError: option !== 'n' };
  if (isValid.hasError) {
    isValid.errorMsg = [
      `tail: illegal option -- ${option}`,
      'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    ];
  }
  return isValid;
};

const isValidValue = function(option, optionValue) {
  const validOptionAndValue = {};
  validOptionAndValue.hasError = !Number.isInteger(+optionValue);
  if (validOptionAndValue.hasError) {
    validOptionAndValue.errorMsg = [`tail: illegal offset -${optionValue}`];
    return validOptionAndValue;
  }
  validOptionAndValue[option] = +optionValue;
  return validOptionAndValue;
};

module.exports = {
  processUserOptions,
  isValidValue,
  isValidOption,
  isValidOptionAndValue
};
