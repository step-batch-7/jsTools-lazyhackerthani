const parseUserArgs = function(userArguments) {
  const initialIndex = 0;
  const defaultIsValid = { hasError: false };
  return processUserOptions(userArguments, defaultIsValid, initialIndex);
};

const startsWithMinus = function(option) {
  return /^-/.test(option);
};

const processUserOptions = function(userArgs, isValid, index) {
  const currOption = userArgs[index];
  if (!startsWithMinus(currOption)) {
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
  return isValidValue(userOption, value);
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
  validOptionAndValue.hasError = optionValue === undefined;
  if (validOptionAndValue.hasError) {
    validOptionAndValue.errorMsg = [
      `tail: option requires an argument -- ${option}`,
      'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
    ];
    return validOptionAndValue;
  }
  validOptionAndValue.hasError = !Number.isInteger(+optionValue);
  if (validOptionAndValue.hasError) {
    validOptionAndValue.errorMsg = [`tail: illegal offset -- ${optionValue}`];
    return validOptionAndValue;
  }
  const optionNames = { n: 'numberLine' };
  validOptionAndValue[optionNames[option]] = +optionValue;
  return validOptionAndValue;
};

module.exports = {
  isValidValue,
  isValidOption,
  isValidOptionAndValue,
  parseUserArgs
};
