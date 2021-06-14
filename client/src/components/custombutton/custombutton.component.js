import React from 'react';
import './custombutton.styles.scss';

const CustomButton = ({ children, abort, ...otherProps }) => (
  <button className={`custombutton${abort ? ' abort' : ''}`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
