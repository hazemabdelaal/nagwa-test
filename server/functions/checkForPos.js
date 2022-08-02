const checkForPos = (values, list) =>
  values.every(value => list.some(word => word.pos === value));

module.exports = checkForPos;
