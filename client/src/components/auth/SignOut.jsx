import React from 'react';
import { sessionService } from 'redux-react-session';
import { Redirect } from 'react-router-dom';

const SignOut = () => {
  sessionService.deleteSession();
  sessionService.deleteUser();

  return <Redirect to={{ pathname: '/signin' }} />;
};

export default SignOut;
