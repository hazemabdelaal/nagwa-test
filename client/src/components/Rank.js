import { Button, Card, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Rank = ({ correctAnswers, questionsNumber }) => {
  const [rank, setRank] = useState(0);
  const navigate = useNavigate();

  const calculateScore = num => (num / questionsNumber) * 100;

  // getting the rank from the backend
  const sendScore = async num => {
    const response = await fetch('http://localhost:8080/rank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: num }),
    }).then(res => res.json());

    setRank(Number(response));
  };

  useEffect(() => {
    // resetting the rank
    setRank(0);

    // calculating the score and sending the data to the backend
    const score = calculateScore(correctAnswers);
    sendScore(score);
  }, []);

  return (
    <Card
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
        <Typography variant="h4" color="primary" sx={{ textAlign: 'center' }}>
          <span style={{ color: 'slategray' }}>Your rank is:</span> {rank}
        </Typography>
        <Button
          sx={{ marginY: '2rem', backgroundColor: 'slategray' }}
          variant="contained"
          onClick={() => navigate('/')}
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default Rank;
