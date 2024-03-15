// GestureRecognition.js

import React from 'react';
import { Button } from '@mui/material';

const GestureRecognition = () => {
  const handleGestureRecognition = async () => {
    try {
      // Send a request to the backend to execute the Python script
      const response = await fetch('/api/startRecognition', {
        method: 'POST',
      });
      if (response.ok) {
        console.log('Recognition started successfully');
      } else {
        console.error('Failed to start recognition');
      }
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  };

  return (
    <div>
      <h1>Gesture Recognition</h1>
      <Button onClick={handleGestureRecognition}>Start Recognition</Button>
    </div>
  );
};

export default GestureRecognition;
