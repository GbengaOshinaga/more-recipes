import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
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
    <div className="input-field">
      <textarea id={id} className="materialize-textarea" value={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

TextArea.propTypes = propTypes;

export default TextArea;
