import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  id, type, onChange, value, label
}) => (
  <div className="row">
    <div className="input-field col s12">
      <input id={id} type={type} className="validate" onChange={onChange} value={value} />
      <label htmlFor={id}>{label}</label>
    </div>
  </div>
);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputField;
