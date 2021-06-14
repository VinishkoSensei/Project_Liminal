import React from 'react';
import './switch.styles.scss';

const Switch = ({ checked, handleCheckboxChange }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        value={checked}
        name="checked"
        onChange={handleCheckboxChange}
      />
      <span className="slider" />
    </label>
  );
};

export default Switch;
