import React from 'react';
import './card-music.styles.scss';
import { connect } from 'react-redux';
import { playNextTrack, playRadio } from '../../redux/music/music.actions';

const CardMusic = ({ changedCards, isNotRadio, playNextTrack, playRadio }) => {
  return (
    <div className="card-music">
      <div className="card-big-cover-container">
        <img src={`/images/1.jpg`} alt="profileimage" />
      </div>
      {isNotRadio ? (
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
          <div className="card-big-control" onClick={() => playNextTrack()}>
            <img src="/images/play.svg" alt="play" />
          </div>
          <div className="card-big-control">
            <img src="/images/forward.svg" alt="forward" />
          </div>
        </div>
      ) : (
        <div className="card-big-controls">
          <div className="card-big-control" onClick={() => playRadio()}>
            <img src="/images/play.svg" alt="play" />
          </div>
        </div>
      )}
      <div className={`card-big-blur${changedCards ? '' : ' disabled'}`}></div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  playRadio: () => dispatch(playRadio()),
});

export default connect(null, mapDispatchToProps)(CardMusic);
