import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSignOut } from '../../hooks/authorization';

const SignOut = () => {
  const { signOut } = useSignOut();

  useEffect(() => {
    signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to={{ pathname: '/signin' }} />;
};

export default SignOut;
