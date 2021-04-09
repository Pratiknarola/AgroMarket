import React, { useState } from 'react';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';


const initialState={firstName:'',lastName:'',email:'',username:'',password:'',confirmPassword:''}

const Login = ({setUser}) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData,setFormData]=useState(initialState)
  let history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
     if(isSignup){
       axios.post('http://localhost:8080/api/auth/signup',{
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        username:formData.username,
        password:formData.password,
        confirmPassword:formData.confirmPassword,
       }).then((res)=>console.log(res))
       .catch((err)=>console.log(err))
     }
     else{

      axios.post('http://localhost:8080/api/auth/signin',{
        username:formData.username,
        password:formData.password,
       }).then((res)=>console.log(res))
       .catch((err)=>console.log(err))

       setUser('rohit')
       history.push('/dashboard')
     }
     setFormData(initialState)
  };

 

  const handleChange = (e) => {
      setFormData({...formData,[e.target.name]:e.target.value})
  }



  return (
     
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            </>
            )}
            <Input name="username" label="username" handleChange={handleChange} />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;