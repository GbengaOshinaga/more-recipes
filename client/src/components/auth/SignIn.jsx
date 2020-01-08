import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useSignIn } from '../../hooks/authorization';
import GoogleLoginButton from './GoogleLoginButton';
import Link from '../common/Link';
import Button from '../common/Button';
import useStyles from './SignInStyles';

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isSigningIn, signIn } = useSignIn();

  const onClickSignIn = event => {
    event.preventDefault();
    signIn({ email, password });
  };

  const onGoogleLoginSuccess = response => {
    signIn({
      email: response?.profileObj?.email,
      password: process.env.GOOGLE_LOGIN_PASSWORD
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Grid direction="row" justify="center" alignItems="center" container>
          <Link to="/catalog" variant="body1">
            Catalog
          </Link>
        </Grid>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
              color="secondary"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              color="secondary"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={onClickSignIn}
              isLoading={isSigningIn}
            >
              Sign In
            </Button>

            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <GoogleLoginButton
                  onSuccess={onGoogleLoginSuccess}
                  buttonText="Sign In With Google"
                />
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
