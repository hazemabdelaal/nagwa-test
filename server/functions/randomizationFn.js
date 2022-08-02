const shuffleArray = require('./shuffleArray');

const randomizationFn = arr => {
  shuffleArray(arr);

  const wordsList = [];

  for (let i = 0; i < arr.length; i++) {
    const currentObj = arr[i];

    if (wordsList.length < 10) {
      // if the current word in iteration isn't present in the wordsList then add it
      if (!wordsList.some(obj => obj.id === currentObj.id)) {
        wordsList.push(currentObj);
      }
    } else {
      // if the current word in iteration is present in the wordsList then skip it
      continue;
    }
  }

  return wordsList;
};

module.exports = randomizationFn;
