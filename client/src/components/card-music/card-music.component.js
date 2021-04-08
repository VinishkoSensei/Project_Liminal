import React from 'react';
import './card-music.styles.scss';
import { connect } from 'react-redux';
import { profiledummy } from '../../dummies/profile-dummy';
import { playNextTrack, playRadio } from '../../redux/music/music.actions';

const CardMusic = ({ changedCards, isNotRadio, playNextTrack, playRadio }) => {
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
          /* onClick={() => ('http://localhost:3001/stream')}*/
          onClick={() => playNextTrack()}
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

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  playRadio: () => dispatch(playRadio()),
});

export default connect(null, mapDispatchToProps)(CardMusic);
