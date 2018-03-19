import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SocialLoginButtons from './SocialLoginButtons';
import { Header } from '../common/Header';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

/**
 * Functional component for sign up form
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
function SignUpForm({
  onChange, onClickSave, firstName, lastName, email,
  password, confirmPassword, onSuccess, onFailure
}) {
  return (
    <div className="sign-body">
      <Header
        catalogId="catalog-nav"
        mainLinks={
          <React.Fragment>
            <li><Link to="/catalog">Catalog</Link></li>
          </React.Fragment>}
      />
      <div className="signup-box">
        <InputField
          id="firstName"
          type="text"
          onChange={onChange}
          value={firstName}
          label="First Name"
          dataError="First Name is required"
        />
        <InputField
          id="lastName"
          type="text"
          onChange={onChange}
          value={lastName}
          label="Last Name"
          dataError="Last Name is required"
        />
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
          dataError="Password is required"
        />
        <InputField
          id="confirmPassword"
          type="password"
          onChange={onChange}
          value={confirmPassword}
          label="Confirm Password"
          dataError="Confirm Password is required"
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
          href="/signin"
          hrefText="Sign In"
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Sign Up With Google"
        />
      </div>
    </div>
  );
}

SignUpForm.propTypes = propTypes;

export default SignUpForm;
