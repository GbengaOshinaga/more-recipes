import React from 'react';
import PropTypes from 'prop-types';

const SocialLoginButtons = ({ isAMemberText, href, hrefText }) => (
  <div>
    <div className="row">
      <p>OR</p>
    </div>
    <div>
      <div className="fb-login-button social-login" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" 	data-auto-logout-link="false" data-use-continue-as="false" />
      <div id="my-signin2" className="social-login" align="center" />
    </div>
    <p>{isAMemberText} <a href={href}>{hrefText}</a></p>
  </div>
);

SocialLoginButtons.propTypes = {
  isAMemberText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  hrefText: PropTypes.string.isRequired
};

export default SocialLoginButtons;
