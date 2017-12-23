import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  materialIcon: PropTypes.string,
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

const defaultProps = {
  materialIcon: ''
};

/**
 * Functional component for button
 * @param {*} props
 * @returns {*} jsx
 */
function Button({
  onClick, type, name, materialIcon, className, buttonText
}) {
  return (
    <button onClick={onClick} className={className} type={type} name={name}>{buttonText}
      {materialIcon && <i className="material-icons right">{materialIcon}</i>}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
