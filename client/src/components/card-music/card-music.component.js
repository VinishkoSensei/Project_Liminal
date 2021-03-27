import React from 'react';
import './card-music.styles.scss';
import { profiledummy } from '../../dummies/profile-dummy';

const CardMusic = ({ changedCards, isNotRadio, setSrc }) => {
  return (
    <div className="card-music">
      <div className="card-big-cover-container">
        <img src={`/${profiledummy.photourl}`} alt="profileimage" />
      </div>
      <div className="card-big-controls">
        {isNotRadio ? (
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
        ) : null}

        <div
          className="card-big-control"
          onClick={() => setSrc('http://localhost:3001/stream')}
        >
          <img src="/images/play.svg" alt="play" />
        </div>

        {isNotRadio ? (
          <div className="card-big-control">
            <img src="/images/forward.svg" alt="forward" />
          </div>
        ) : null}
      </div>
      <div className={`card-big-blur${changedCards ? '' : ' disabled'}`}></div>
    </div>
  );
};

export default CardMusic;
