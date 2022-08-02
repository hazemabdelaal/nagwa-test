const rankCalculationFn = (score, arr) => {
  const rankLength = arr.filter(num => num < score).length;

  const rankPercentage = (rankLength / arr.length) * 100;

  // rounding to the nearest hundredth
  return rankPercentage.toFixed(2);
};

module.exports = rankCalculationFn;
