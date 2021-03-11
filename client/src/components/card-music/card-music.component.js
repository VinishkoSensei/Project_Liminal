import React from 'react';
import './card-music.styles.scss';
import { profiledummy } from '../../dummies/profile-dummy';

const CardMusic = ({ changedCards }) => {
  return (
    <div className="card-music">
      <div className="card-big-cover-container">
        <img src={`/${profiledummy.photourl}`} alt="profileimage" />
      </div>
      <div className="card-big-controls">
        <div className="card-big-control">
          <img
            src="/images/forward.svg"
            alt="backward"
            style={{
              WebkitTransform: 'scaleX(-1)',
              transform: 'scaleX(-1)',
            }}
          />
        </div>
        <div className="card-big-control">
          <img src="/images/play.svg" alt="play" />
        </div>
        <div className="card-big-control">
          <img src="/images/forward.svg" alt="forward" />
        </div>
      </div>
      <div className={`card-big-blur${changedCards ? '' : ' disabled'}`}></div>
    </div>
  );
};

export default CardMusic;
