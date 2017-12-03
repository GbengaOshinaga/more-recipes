import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SocialLoginButtons from './SocialLoginButtons';

const SignUpForm = ({
  onChange, onClickSave, firstName, lastName, email, password, confirmPassword
}) => (
  <div>
    <InputField
      id="firstName"
      type="text"
      onChange={onChange}
      value={firstName}
      label="First Name"
    />
    <InputField
      id="lastName"
      type="text"
      onChange={onChange}
      value={lastName}
      label="Last Name"
    />
    <InputField
      id="email"
      type="email"
      onChange={onChange}
      value={email}
      label="Email Address"
    />
    <InputField
      id="password"
      type="password"
      onChange={onChange}
      value={password}
      label="Password"
    />
    <InputField
      id="confirmPassword"
      type="password"
      onChange={onChange}
      value={confirmPassword}
      label="Confirm Password"
    />
    <Button
      onClick={onClickSave}
      className="btn waves-effect waves-light red darken-2"
      type="submit"
      name="action"
      materialIcon="send"
      buttonText="Submit"
    />
    <SocialLoginButtons
      isAMemberText="Already a member?"
      href="signin.html"
      hrefText="Sign In"
    />
  </div>
);

SignUpForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired
};

export default SignUpForm;
