import React,{useEffect} from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function GoogleSignIn (){

    const navigate = useNavigate();

    useEffect(()=>{

    function start() {
        gapi.client.init({
            clientId: '911426469735-eg01etc458g6neomcbhkgv691en8i6ga.apps.googleusercontent.com',
            scope: 'email',
        });
        }

        gapi.load('client:auth2', start);

    },[])
 

  const signIn = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      // Use the GoogleUser object for the signed-in user.
      console.log(googleUser);
      localStorage.setItem('googleUser',JSON.stringify(googleUser.wt))
      // Redirect or perform actions after successful login.
      navigate('/dashboard')

    });
  };

    return (
        <div style={{textAlign:"center"}}>
            <Grid container spacing={2}>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={signIn} style={{marginTop:'300px'}}>Sign in with Google</Button>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
        </div>
    );
}

export default GoogleSignIn;
