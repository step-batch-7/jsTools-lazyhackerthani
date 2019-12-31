const parseUserArgs = function(userArguments) {
  const initialIndex = 0;
  const defaultIsValid = { hasError: false };
  return processUserOptions(userArguments, defaultIsValid, initialIndex);
};

const processUserOptions = function(userArgs, isValid, index) {
  const currOption = userArgs[index];
  if (!/^-/.test(currOption)) {
    return Object.assign(isValid, { files: userArgs.slice(index) });
  }
  let charPosition = 1;
  const option = currOption.charAt(charPosition);
  const value = currOption.slice(++charPosition) || userArgs[++index];
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
  isValidValue,
  isValidOption,
  isValidOptionAndValue,
  parseUserArgs
};
