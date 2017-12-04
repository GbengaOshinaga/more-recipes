import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SocialLoginButtons from './SocialLoginButtons';

const SignInForm = ({
  onChange, email, password, onClickSave
}) => (
  <div>
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
    <Button
      onClick={onClickSave}
      className="btn waves-effect waves-light red darken-2"
      type="submit"
      name="action"
      materialIcon="arrow_forward"
      buttonText="Sign In"
    />
    <SocialLoginButtons
      isAMemberText="Not a member?"
      href="signup.html"
      hrefText="Sign Up"
    />
  </div>
);

SignInForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired
};

export default SignInForm;
