import React from 'react';
import '../forminput.styles.scss';

const FormInput = ({
  handleChange,
  label,
  bordered,
  handleChangingItemType,
  handleEditingFinish,
  ...otherProps
}) => (
  <div
    className="group"
    onClick={handleChangingItemType ? handleChangingItemType : null}
  >
    <input
      className={`forminput ord${bordered ? ' border' : ''}`}
      onChange={handleChange}
      onBlur={handleEditingFinish}
      {...otherProps}
    />

    {label && otherProps.value ? (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''} forminputlabel`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
