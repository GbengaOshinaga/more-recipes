import React from 'react';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GoogleLoginButton from './GoogleLoginButton';
import Link from '../common/Link';
import Button from '../common/Button';
import { useSignUp } from '../../hooks/authorization';
import useStyles from './SignUpStyles';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePic: ''
};

export default function SignUp() {
  const classes = useStyles();

  const { isSigningUp, signUp } = useSignUp();

  const onSubmit = values => {
    signUp(values);
  };

  const onGoogleLoginSuccess = response => {
    const { profileObj: { givenName, familyName, email, imageUrl } = {} } =
      response || {};

    const data = {
      firstName: givenName,
      lastName: familyName,
      email,
      password: process.env.GOOGLE_LOGIN_PASSWORD,
      confirmPassword: process.env.GOOGLE_LOGIN_PASSWORD,
      profilePic: imageUrl
    };

    signUp(data);
  };

  const renderTextField = ({
    label,
    name,
    autoComplete,
    value,
    key,
    setFieldValue,
    autoFocus,
    type
  }) => {
    return (
      <TextField
        variant="outlined"
        required
        fullWidth
        id={key}
        label={label}
        name={name}
        value={value}
        type={type}
        onChange={e => setFieldValue(key, e.target.value)}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        color="secondary"
      />
    );
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, handleSubmit }) => {
        const {
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        } = values;

        return (
          <>
            <Grid
              direction="row"
              justify="center"
              alignItems="center"
              container
            >
              <Link to="/catalog" variant="body1">
                Catalog
              </Link>
            </Grid>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      {renderTextField({
                        label: 'First Name',
                        name: 'firstName',
                        autoComplete: 'fname',
                        autoFocus: true,
                        value: firstName,
                        key: 'firstName',
                        setFieldValue
                      })}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {renderTextField({
                        label: 'Last Name',
                        name: 'lastName',
                        autoComplete: 'lname',
                        value: lastName,
                        key: 'lastName',
                        setFieldValue
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {renderTextField({
                        label: 'Email Address',
                        name: 'email',
                        autoComplete: 'email',
                        value: email,
                        key: 'email',
                        setFieldValue
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {renderTextField({
                        label: 'Password',
                        name: 'password',
                        autoComplete: 'current-password',
                        value: password,
                        key: 'password',
                        type: 'password',
                        setFieldValue
                      })}
                    </Grid>
                    <Grid item xs={12}>
                      {renderTextField({
                        label: 'Confirm Password',
                        name: 'password',
                        autoComplete: 'current-password',
                        value: confirmPassword,
                        key: 'confirmPassword',
                        type: 'password',
                        setFieldValue
                      })}
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={handleSubmit}
                    isLoading={isSigningUp}
                  >
                    Sign Up
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
                        buttonText="Sign Up With Google"
                      />
                    </Grid>
                    <Grid item>
                      <Link to="/signin" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </>
        );
      }}
    </Formik>
  );
}
