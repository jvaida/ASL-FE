import React, { useState, useEffect, useRef } from 'react';
import { Card, CardMedia, Grid, Container, CircularProgress, Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { ButtonGroup } from '@mui/material';
import Webcam from "react-webcam";
import * as tf from '@tensorflow/tfjs';

const LessonOne = () => {
  const [aslSigns, setAslSigns] = useState([]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [cameraStream, setCameraStream] = useState(null);
  const [videoSrc, setVideoSrc] = useState()
  const [predictedSign, setPredictedSign] = useState()
  const webcamRef = useRef(null);
  const modelRef = useRef(null);

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

    const loadModel = async () => {
      // Adjust this path to where your TensorFlow.js model is located
      const modelURL = '/path_to_your_model/model.json';
      try {
        const model = await tf.loadGraphModel(modelURL);
        modelRef.current = model;
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Failed to load the model', error);
      }
  }
      
    fetchAslSigns();
    loadModel();

  }, [])




  useEffect(() => {
    // Access the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setVideoSrc(window.URL.createObjectURL(stream));
      })
      .catch(err => console.error(err));
  }, []);


    // Function to capture a frame and send it to the Flask API
    const captureFrame = async () => {
      if (webcamRef.current && modelRef.current) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
  
        const img = tf.browser.fromPixels(video);
        // Preprocess the image here (resize, normalize, etc.) to match your model's input requirements
        const resized = img.resizeBilinear([28, 28]).toFloat().expandDims(0);
        // Predict
        const predictions = await modelRef.current.predict(resized).data();
        // Interpret your predictions here
        
        // Set the predicted sign to state or handle it as needed
        setPredictedSign('Your Predicted Sign Here');
      }
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        captureFrame();
      }, 1000); // Adjust time interval as needed for performance
  
      return () => clearInterval(intervalId);
    }, []);

    
  const handleStartRecognition = async () => {
      await axios.post('http://localhost:105/realtime-recognition')
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.error('Error starting real-time recognition:', err);
      })
     
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
          {/* <Button variant="contained" onClick={handleStartRecognition}>Start Real-Time Recognition</Button> */}
          <Webcam ref={webcamRef} style={{ width: "100%" }} audio={false} />
          <Typography variant="h6">{predictedSign}</Typography>

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
