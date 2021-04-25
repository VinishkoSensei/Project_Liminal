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
    className={`${inverted ? 'inverted ' : ''}
    ${abort ? 'abort ' : ''}
    ${transparent ? 'transparent ' : ''}
    custombutton`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
