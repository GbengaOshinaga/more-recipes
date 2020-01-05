import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useSignUp } from '../../hooks/authorization';
import InputField from '../common/InputField';
import Header from '../common/Header';
import Button from '../common/Button';
import GoogleLoginButton from './GoogleLoginButton';

// const defaultUserAvatar =
//   'http://res.cloudinary.com/king-more-recipes/image/upload/v1518031651/Expert-tutor-placeholder_cg9wet.jpg';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePic: ''
};

const SignUp = () => {
  const { signUp } = useSignUp();

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

  const renderInput = ({
    id,
    type,
    value,
    label,
    dataError,
    setFieldValue,
    key
  }) => (
    <InputField
      id={id}
      type={type}
      onChange={e => setFieldValue(key, e.target.value)}
      value={value}
      label={label}
      dataError={dataError}
    />
  );

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
          <div className="sign-body">
            <Header
              catalogId="catalog-nav"
              mainLinks={
                <>
                  <li>
                    <Link to="/catalog">Catalog</Link>
                  </li>
                </>
              }
            />
            <div className="signup-box">
              {renderInput({
                id: 'firstName',
                type: 'text',
                value: firstName,
                label: 'First Name',
                setFieldValue,
                key: 'firstName',
                dataError: 'First Name is required'
              })}
              {renderInput({
                id: 'lastName',
                type: 'text',
                value: lastName,
                label: 'Last Name',
                setFieldValue,
                key: 'lastName',
                dataError: 'Last Name is required'
              })}
              {renderInput({
                id: 'email',
                type: 'email',
                value: email,
                label: 'Email Address',
                setFieldValue,
                key: 'email',
                dataError: 'Invalid Email Address'
              })}
              {renderInput({
                id: 'password',
                type: 'password',
                value: password,
                label: 'Password',
                setFieldValue,
                key: 'password',
                dataError: 'Password is required'
              })}
              {renderInput({
                id: 'confirmPassword',
                type: 'password',
                value: confirmPassword,
                label: 'Confirm Password',
                setFieldValue,
                key: 'confirmPassword',
                dataError: 'Confirm Password is required'
              })}
              <Button
                onClick={handleSubmit}
                className="btn waves-effect waves-light red darken-2"
                type="submit"
                name="action"
                materialIcon="send"
                buttonText="Submit"
              />
              <GoogleLoginButton
                onSuccess={onGoogleLoginSuccess}
                buttonText="Sign Up With Google"
              />
              <p>
                Already a member? <Link to="/signin">Sign In</Link>
              </p>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUp;
