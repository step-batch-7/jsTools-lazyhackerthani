const parseUserArgs = function(userArguments) {
  const initialIndex = 0;
  const defaultIsValid = { hasError: false };
  return processUserOptions(userArguments, defaultIsValid, initialIndex);
};

const startsWithMinus = function(option) {
  return /^-/.test(option);
};

const processUserOptions = function(userArgs, isValid) {
  let index = 0;
  const currOption = userArgs[index];
  if (!startsWithMinus(currOption)) {
    return Object.assign(isValid, { files: userArgs });
  }
  let charPosition = 1;
  const option = currOption.charAt(charPosition);
  const value = currOption.slice(++charPosition) || userArgs[++index];
  isValid = isValidOptionAndValue(option, value);
  if (isValid.hasError) {
    return isValid;
  }
  return processUserOptions(userArgs.slice(++index), isValid);
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
  let hasError = optionValue === undefined;
  if (hasError) {
    return {
      hasError,
      errorMsg: [
        `tail: option requires an argument -- ${option}`,
        'usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]'
      ]
    };
  }
  hasError = !Number.isInteger(+optionValue);
  if (hasError) {
    return { hasError, errorMsg: [`tail: illegal offset -- ${optionValue}`] };
  }
  return { hasError, numberLine: +optionValue };
};

module.exports = {
  isValidValue,
  isValidOption,
  isValidOptionAndValue,
  parseUserArgs
};
