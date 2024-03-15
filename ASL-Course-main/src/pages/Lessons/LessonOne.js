import React, { useState, useEffect } from 'react';
import { Card, CardMedia, Grid, Container, CircularProgress, Box, Button } from '@mui/material';
import axios from 'axios';
import { ButtonGroup } from '@mui/material';

const LessonOne = () => {
  const [aslSigns, setAslSigns] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = React.useRef(null);

  useEffect(() => {
    const fetchAslSigns = async () => {
      try {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').join(' ');
        const response = await axios.post('http://localhost:105/text-to-image', { text: alphabet });
        setAslSigns(response.data.recognized_images);
      } catch (error) {
        console.error('Error fetching ASL signs:', error);
      }
    };
    fetchAslSigns();

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const handleStartRecognition = async () => {
    try {
      await axios.post('http://localhost:105/realtime-recognition');
    } catch (error) {
      console.error('Error starting real-time recognition:', error);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={6}>
          <Box sx={{ width: '100%', padding: '10px' }}>
            {aslSigns.length > 0 ? (
              <Card sx={{ mb: 2, width: '100%', maxWidth: '600px' }}>
                {aslSigns[currentLetterIndex] && aslSigns[currentLetterIndex].data ? (
                  <CardMedia
                    component="img"
                    image={`data:image/jpeg;base64,${aslSigns[currentLetterIndex].data}`}
                    alt={`ASL Sign for ${aslSigns[currentLetterIndex].word}`}
                    sx={{ height: 'auto', width: '100%' }}
                  />
                ) : (
                  <CircularProgress />
                )}
              </Card>
            ) : (
              <CircularProgress size={60} />
            )}
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="contained" onClick={handleStartRecognition}>Start Real-Time Recognition</Button>
        </Grid>
      </Grid>
      <Grid container sx={{ justifyContent: 'flex-start', paddingLeft: '20px', paddingBottom: '20px' }}>
        <ButtonGroup variant="text" aria-label="text button group">
          {'abcdefghijklm'.split('').map((letter, index) => (
            <Button
              key={letter}
              sx={{ minWidth: '40px' }}
              variant={currentLetterIndex === index ? 'contained' : 'outlined'}
              onClick={() => setCurrentLetterIndex(index)}
            >
              {letter.toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
      <Grid container sx={{ justifyContent: 'flex-start', paddingLeft: '20px' }}>
        <ButtonGroup variant="text" aria-label="text button group">
          {'nopqrstuvwxyz'.split('').map((letter, index) => (
            <Button
              key={letter}
              sx={{ minWidth: '40px' }}
              variant={currentLetterIndex === index + 13 ? 'contained' : 'outlined'}
              onClick={() => setCurrentLetterIndex(index + 13)}
            >
              {letter.toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>
    </Container>
  );
};

export default LessonOne;
