import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SocialLoginButtons from './SocialLoginButtons';
import { SignInAndSignUpHeader } from '../common/Header';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  errors: PropTypes.any
};

const defaultProps = {
  errors: []
};

/**
 * Display errors
 * @param {*} errors
 * @returns {jsx} errors
 */
function listErrors(errors) {
  if (errors.constructor === Array) {
    return errors.map((error, index) => <li key={index}>{error}</li>);
  }
  return errors;
}

/**
 * Functional component for signin form
 * @param {*} props
 * @returns {*} jsx
 */
function SignInForm({
  onChange, email, password, onClickSave, errors
}) {
  return (
    <div className="sign-body">
      <SignInAndSignUpHeader />
      <div className="signin-box">
        <InputField
          id="email"
          type="email"
          onChange={onChange}
          value={email}
          label="Email Address"
          dataError="Invalid Email Address"
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
        {errors && <ul className="red-text">{listErrors(errors)}</ul>}
        <SocialLoginButtons
          isAMemberText="Not a member?"
          href="/signup"
          hrefText="Sign Up"
        />
      </div>
    </div>
  );
}

SignInForm.propTypes = propTypes;
SignInForm.defaultProps = defaultProps;

export default SignInForm;
