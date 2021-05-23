import React from 'react';
import './small-button.styles.scss';

const SmallButton = ({ onClick, isHidden }) => {
  return (
    <div
      className={`small-btn${isHidden ? ' hidden' : ''}`}
      onClick={onClick}
    />
  );
};

export default SmallButton;
