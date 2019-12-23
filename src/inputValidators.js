const getN = function(usrArgs) {
  return usrArgs[usrArgs.indexOf('-n') + 1];
};

module.exports = { getN };
