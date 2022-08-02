import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Practice from './Practice';
import Rank from './Rank';
import '../App.css';
import Title from './Title';
import { Container } from '@mui/system';

const App = () => {
  // states used by both children components
  const [questionsNumber, setQuestionsNumber] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  return (
    <BrowserRouter>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Title />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Practice
                questionsNumber={questionsNumber}
                setQuestionsNumber={setQuestionsNumber}
                setCorrectAnswers={setCorrectAnswers}
              />
            }
          />
          <Route
            exact
            path="/rank"
            element={
              <Rank
                correctAnswers={correctAnswers}
                questionsNumber={questionsNumber}
              />
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
