import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { logger } from '../../utils';

const propTypes = {
  onSuccess: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};

/**
 * Functional component for social login buttons
 * @param {Object} props
 *
 * @returns {Node} jsx
 */
function GoogleLoginButton({ onSuccess, buttonText }) {
  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      buttonText={buttonText}
      onSuccess={onSuccess}
      onFailure={response => logger('Google Login Failure', response)}
    />
  );
}

GoogleLoginButton.propTypes = propTypes;

export default GoogleLoginButton;
