import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  onClick, type, name, materialIcon, className, buttonText
}) => (
  <button onClick={onClick} className={className} type={type} name={name}>{buttonText}
    {materialIcon && <i className="material-icons right">{materialIcon}</i>}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  materialIcon: PropTypes.string,
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default Button;
