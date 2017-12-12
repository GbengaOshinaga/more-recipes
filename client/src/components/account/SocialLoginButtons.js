import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

const propTypes = {
  isAMemberText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  hrefText: PropTypes.string.isRequired
};


/**
 * Functional component for social login buttons
 * @param {*} props
 * @returns {*} jsx
 */
function SocialLoginButtons({ isAMemberText, href, hrefText }) {
  return (
    <div>
      <div className="row">
        <p>OR</p>
      </div>
      <div>
        <FacebookLogin
          appId="1749132872055191"
          fields="name, email, picture"
          scope="public_profile, email"
          // callback={facebook}
        />
        <GoogleLogin
          clientId="827684783940-iisct8ub0eifot2ebb4fod5f3nrnk7ij.apps.googleusercontent.com"
          buttonText="Login With Google"
          // onSuccess={facebook}
          // onFailure={facebook}
        />
        {/* <div id="my-signin2" className="social-login" align="center" /> */}
      </div>
      <p>{isAMemberText} <Link to={href}>{hrefText}</Link></p>
    </div>
  );
}

SocialLoginButtons.propTypes = propTypes;

export default SocialLoginButtons;
