import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';
import Button from '../common/Button';
import GoogleLoginButton from './GoogleLoginButton';
import { Header } from '../common/Header';
import { useSignIn } from '../../hooks/authorization';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useSignIn();

  const onGoogleLoginSuccess = response => {
    signIn({
      email: response?.profileObj?.email,
      password: process.env.GOOGLE_LOGIN_PASSWORD
    });
  };

  return (
    <div className="sign-body">
      <Header
        mainLinks={
          <>
            <li>
              <Link id="catalog-link" to="/catalog">
                Catalog
              </Link>
            </li>
          </>
        }
      />
      <div className="container">
        <div className="col s12">
          <div className="signin-box">
            <InputField
              id="email"
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              label="Email Address"
              dataError="Invalid Email Address"
            />
            <InputField
              id="password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              label="Password"
            />
            <Button
              onClick={() => signIn({ email, password })}
              className="btn waves-effect waves-light red darken-2"
              type="submit"
              name="action"
              materialIcon="arrow_forward"
              buttonText="Sign In"
            />
            <GoogleLoginButton
              onSuccess={onGoogleLoginSuccess}
              onFailure={() => {}}
              buttonText="Sign In With Google"
            />
            <p>
              Not a member? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
