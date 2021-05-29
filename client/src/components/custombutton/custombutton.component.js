import React from 'react';
import './custombutton.styles.scss';

const CustomButton = ({
  children,
  inverted,
  abort,
  transparent,
  ...otherProps
}) => (
  <button
    className={`custombutton${inverted ? ' inverted' : ''}${
      abort ? ' abort' : ''
    }${transparent ? ' transparent' : ''}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
