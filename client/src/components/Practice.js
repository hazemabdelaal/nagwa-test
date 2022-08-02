import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Progress from './Progress';
import 'react-toastify/dist/ReactToastify.css';
import { Typography, Button, CardContent, Card, Grid } from '@mui/material';
import '../App.css';

const Practice = ({
  questionsNumber,
  setQuestionsNumber,
  setCorrectAnswers,
}) => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState({});
  const [posList, setPosList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [answeredNumber, setAnsweredNumber] = useState(0);
  const navigate = useNavigate();

  // getting the list of random words from the backend
  const getWords = async () => {
    const response = await fetch('http://localhost:8080/words').then(res =>
      res.json()
    );

    setWords(response);

    // number of fetched words
    setQuestionsNumber(response.length);

    // catching the first word to display for the user
    setCurrentWord(response[0]);

    // catching all types of the Part of Speech to be resembled as buttons
    const tempPosList = [];
    response?.map(word => tempPosList.push(word.pos));
    setPosList(() => [...new Set(tempPosList)].sort());
  };

  // switching to the next word after the user picks an answer
  const showNextWord = arr => {
    const currentIndex = arr.indexOf(currentWord);
    const nextIndex = currentIndex + 1;
    const nextWord = words[nextIndex];

    if (nextWord) {
      setCurrentWord(nextWord);
    } else {
      // if this is the last word go to the rank page
      navigate('/rank');
    }
  };

  // calculating the progress
  const calculateProgress = (answeredNum, questionsNum) => {
    setProgress((answeredNum / questionsNum) * 100);
  };

  // checking if the user chose the correct or incorrect PoS
  const checkAnswer = answer => {
    if (currentWord.pos === answer) {
      // incrementing the correct answers count if true
      setCorrectAnswers(prevState => prevState + 1);
      toast.success('Correct Answer');
    } else {
      toast.error('Incorrect Answer');
    }

    // tracing the number of answered questions
    setAnsweredNumber(prev => prev + 1);

    // incrementing the answered number answered questions to avoid the initial state of 0 -- (0 / any number = 0)
    calculateProgress(answeredNumber + 1, questionsNumber);
  };

  useEffect(() => {
    // resetting the internal states
    setAnsweredNumber(0);
    setCorrectAnswers(0);

    getWords();
  }, []);

  return (
    <Card
      className="card"
      sx={{
        backgroundColor: 'aliceblue',
        margin: 'auto 0',
        padding: '1rem 2rem',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" textTransform="capitalize" color="primary">
          {currentWord?.word}
        </Typography>

        <Grid container>
          {words &&
            posList.map(pos => (
              <Grid item sm={3} key={pos}>
                <Button
                  sx={{
                    backgroundColor: 'slategray',
                    padding: '0.5rem 1rem',
                    minWidth: '7rem',
                    margin: '1rem 1rem',
                  }}
                  variant="contained"
                  onClick={() => {
                    checkAnswer(pos);
                    showNextWord(words);
                  }}
                >
                  {pos}
                </Button>
              </Grid>
            ))}
        </Grid>
        <Progress value={progress} />

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
        />
      </CardContent>
    </Card>
  );
};

export default Practice;
