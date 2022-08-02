const checkForPos = require('./checkForPos');
const randomizationFn = require('./randomizationFn');

const valuesCheckingFn = (values, list) => {
  checkForPos(values, list)
    ? res.json(list)
    : valuesCheckingFn(values, randomizationFn(data.wordList));
};

module.exports = valuesCheckingFn;
