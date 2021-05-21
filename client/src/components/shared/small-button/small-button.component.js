import React from 'react';
import './small-button.styles.scss';

const SmallButton = ({ onClick }) => {
  return <div className="small-btn" onClick={onClick} />;
};

export default SmallButton;
