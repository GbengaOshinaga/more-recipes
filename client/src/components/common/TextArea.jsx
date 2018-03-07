import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const defaultProps = {
  label: ''
};

/**
 * Functional component for textarea
 * @param {*} props
 * @returns {*} jsx
 */
function TextArea({
  id, label, onChange, value
}) {
  return (
    <div className="input-field col s12">
      <textarea
        id={id}
        className="materialize-textarea"
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;

export default TextArea;
