import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

const propTypes = {
  isAMemberText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  hrefText: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired
};


/**
 * Functional component for social login buttons
 * @param {*} props
 * @returns {*} jsx
 */
function SocialLoginButtons({
  isAMemberText, href, hrefText, onSuccess, onFailure, buttonText
}) {
  return (
    <div>
      <div className="row">
        <p>OR</p>
      </div>
      <div>
        <GoogleLogin
          clientId="827684783940-iisct8ub0eifot2ebb4fod5f3nrnk7ij.apps.googleusercontent.com"
          buttonText={buttonText}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      </div>
      <p>{isAMemberText} <Link to={href}>{hrefText}</Link></p>
    </div>
  );
}

SocialLoginButtons.propTypes = propTypes;

export default SocialLoginButtons;
