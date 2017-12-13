import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  dataError: PropTypes.string
};

const defaultProps = {
  dataError: ''
};

/**
 * Functional component for inputfield
 * @param {*} props
 * @returns {*} jsx
 */
function InputField({
  id, type, onChange, value, label, dataError
}) {
  return (
    <div className="row">
      <div className="input-field col s12">
        <input id={id} type={type} className="validate" onChange={onChange} value={value} />
        <label htmlFor={id} data-error={dataError}>{label}</label>
      </div>
    </div>
  );
}

InputField.propTypes = propTypes;
InputField.defaultProps = defaultProps;

export default InputField;
