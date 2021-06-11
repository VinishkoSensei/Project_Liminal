import React from 'react';
import './back-button.styles.scss';

const BackButton = ({ imageUrl, handleClick }) => {
  return (
    <div
      className="btn-back"
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={handleClick}
    />
  );
};

export default BackButton;
