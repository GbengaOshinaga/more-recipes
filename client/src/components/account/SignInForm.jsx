import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InputField from '../common/InputField';
import Button from '../common/Button';
import SocialLoginButtons from './SocialLoginButtons';
import { Header } from '../common/Header';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

/**
 * Functional component for signin form
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
function SignInForm({
  onChange, email, password, onClickSave, onSuccess, onFailure
}) {
  return (
    <div className="sign-body">
      <Header
        mainLinks={
          <React.Fragment>
            <li><Link to="/catalog">Catalog</Link></li>
          </React.Fragment>}
      />
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
        <SocialLoginButtons
          isAMemberText="Not a member?"
          href="/signup"
          hrefText="Sign Up"
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Sign In With Google"
        />
      </div>
    </div>
  );
}

SignInForm.propTypes = propTypes;

export default SignInForm;
