import React from 'react';
import './card-music.styles.scss';
import { connect } from 'react-redux';
import {
  playNextTrack,
  playRadio,
  emptySrc,
} from '../../redux/music/music.actions';

const CardMusic = ({
  changedCards,
  isNotRadio,
  playRadio,
  isPlaying,
  playerRef,
  playNextTrack,
  emptySrc,
}) => {
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
          {isPlaying ? (
            <div
              className="card-big-control"
              onClick={() => playerRef.current.audio.current.pause()}
            >
              <img src="/images/pause.svg" alt="pause" />
            </div>
          ) : (
            <div
              className="card-big-control"
              onClick={() => playerRef.current.audio.current.play()}
            >
              <img src="/images/play.svg" alt="play" />
            </div>
          )}

          <div className="card-big-control" onClick={() => playNextTrack()}>
            <img src="/images/forward.svg" alt="forward" />
          </div>
        </div>
      ) : (
        <div className="card-big-controls">
          {isPlaying ? (
            <div className="card-big-control" onClick={() => emptySrc()}>
              <img src="/images/pause.svg" alt="pause" />
            </div>
          ) : (
            <div className="card-big-control" onClick={() => playRadio()}>
              <img src="/images/play.svg" alt="play" />
            </div>
          )}
        </div>
      )}
      <div className={`card-big-blur${changedCards ? '' : ' disabled'}`}></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isPlaying: state.music.isPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  playRadio: () => dispatch(playRadio()),
  emptySrc: () => dispatch(emptySrc()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
