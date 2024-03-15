import React,{useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [level, setLevel] = React.useState(1);
    const handleChange = (event) => {
      setLevel(event.target.value);
    };
  
    const handleSubmit = () =>{
        if(level==1){
            navigate('/lesson1')
        }else if(level==2){
            navigate('/lesson2')
        }else if(level==3){
            navigate('/lesson3')
        }else{
            navigate('/lesson1')
        }
    }

    return (
      <div style={{textAlign:"center"}}>
        <h1>Welcome to ASL Learning</h1>
        <p>Select a level to start learning:</p>
        <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            label="Level"
            onChange={handleChange}
            >
            <MenuItem value={1}>One: Alphabets</MenuItem>
            <MenuItem value={2}>Two: Numbers</MenuItem>
            <MenuItem value={3}>Three: Words</MenuItem>
            </Select>
        </FormControl>

            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
        <br />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>

      </div>
    );
  }

export default Dashboard;
