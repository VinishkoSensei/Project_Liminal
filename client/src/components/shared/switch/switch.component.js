import React from 'react';
import './switch.styles.scss';

const Switch = ({ index, checked, handleCheckboxChange }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        value={checked}
        name="checked"
        id={index}
        onChange={handleCheckboxChange}
      />
      <span className="slider" />
    </label>
  );
};

export default Switch;
