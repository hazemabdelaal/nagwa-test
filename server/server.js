const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all data from the json file
const data = require('./api/data.json');

// all the needed functions to send the words list and rank to the frontend
const randomizationFn = require('./functions/randomizationFn');
const checkForPos = require('./functions/checkForPos');
const valuesCheckingFn = require('./functions/valuesCheckingFn');
const rankCalculationFn = require('./functions/rankCalculationFn');

// words endpoint
app.get('/words', (req, res) => {
  const values = ['noun', 'verb', 'adverb', 'adjective'];

  // randomizing the wordsList array of the database and returning 10 of them
  const wordsList = randomizationFn(data.wordList);

  // checking if all PoS are present in array obtained from randomizationFn
  const posCheck = checkForPos(values, wordsList);

  if (!posCheck) {
    // if any PoS wasn't present then repeat the randomizationFn
    valuesCheckingFn(values, randomizationFn(data.wordList));
  } else {
    // if all PoS are present then send the array to the frontend
    res.json(wordsList);
  }
});

// rank endpoint
app.post('/rank', (req, res) => {
  // calculating the rank based on the received score and sending it to the frontend
  const rank = rankCalculationFn(req.body.score, data.scoresList);
  res.json(rank);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
