import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  materialIcon: PropTypes.string,
  className: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

const defaultProps = {
  materialIcon: '',
  name: ''
};

/**
 * Functional component for button
 * @param {Object} props
 *
 * @returns {Node} jsx
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
