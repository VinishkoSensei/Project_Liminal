import React from 'react';
import './forminput.styles.scss';

const FormInput = ({
  handleChange,
  label,
  bordered,
  handleChangingItemType,
  ...otherProps
}) => (
  <div
    className="group"
    onClick={handleChangingItemType ? handleChangingItemType : null}
  >
    <input
      className={`forminput${bordered ? ' border' : ''}`}
      onChange={handleChange}
      {...otherProps}
    />

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
