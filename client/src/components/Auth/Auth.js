import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon";
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router";
import {signin,signup} from '../../actions/auth'
const initialState = {
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:''
}
const Auth = () => {
const history = useHistory()
    const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setIsSignUp] = useState(false);
  const [formData,setFormData] = useState(initialState)
  const submitHandler = (event) => {
    event.preventDefault()
    if(isSignup){
      dispatch(signup(formData,history))
    }else{
      dispatch(signin(formData,history))
    }
  };
  const inputChangeHandler = (event) => {
    setFormData({...formData,[event.target.name]:event.target.value})
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPass) => !prevShowPass);
  };
  const switchMode = () => {
    setIsSignUp((prev) => !prev);
    handleShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId
    try {
        dispatch({type:'AUTH',data:{result,token}})
        history.push('/')
    } catch (error) {
        console.log(error)
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In failed, try again later!");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={inputChangeHandler}
                  autofocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={inputChangeHandler}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={inputChangeHandler}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={inputChangeHandler}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={inputChangeHandler}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
          <GoogleLogin
            clientId="687632370935-9tnb38tn1ejqvc77ucvdnccqriudfveg.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Login
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button className={classes.submit} onClick={switchMode}>
                {isSignup
                  ? "Already a user? Sign In"
                  : "Don't have an account?Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
