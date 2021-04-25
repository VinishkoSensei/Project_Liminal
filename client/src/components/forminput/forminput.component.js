import React from 'react';
import './forminput.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    <input className="forminput" onChange={handleChange} {...otherProps} />

    {label ? (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''} forminputlabel`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
