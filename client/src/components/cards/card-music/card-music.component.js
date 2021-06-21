import React from 'react';
import './card-music.styles.scss';
import { connect } from 'react-redux';
import { playNextTrack, playRadio, emptySrc } from 'redux/music/music.actions';

const CardMusic = ({
  changedCards,
  isNotRadio,
  playRadio,
  isPlaying,
  playerRef,
  playNextTrack,
  emptySrc,
  currentTrack,
  CardBlur,
}) => {
  return (
    <div className="card-music">
      <div
        className="card-big-cover-container"
        style={{
          backgroundImage: `url(${
            isNotRadio ? `/images/music.svg` : `/images/broadcast.svg`
          })`,
        }}
      >
        {currentTrack.cover ? (
          <img
            src={`http://localhost:3001/gettrackcover/${currentTrack.cover}`}
            alt="profileimage"
          />
        ) : null}
      </div>
      {isNotRadio ? (
        <div className="card-big-controls">
          <div className="card-big-control">
            <div
              style={{
                backgroundImage: `url('/images/forward.svg')`,
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
              <div
                style={{
                  backgroundImage: `url('/images/pause.svg')`,
                }}
              />
            </div>
          ) : (
            <div
              className="card-big-control"
              onClick={() => playerRef.current.audio.current.play()}
            >
              <div
                style={{
                  backgroundImage: `url('/images/play.svg')`,
                }}
              />
            </div>
          )}

          <div className="card-big-control" onClick={() => playNextTrack()}>
            <div
              style={{
                backgroundImage: `url('/images/forward.svg')`,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="card-big-controls">
          {isPlaying ? (
            <div className="card-big-control" onClick={() => emptySrc()}>
              <div
                style={{
                  backgroundImage: `url('/images/pause.svg')`,
                }}
              />
            </div>
          ) : (
            <div className="card-big-control" onClick={() => playRadio()}>
              <div
                style={{
                  backgroundImage: `url('/images/play.svg')`,
                }}
              />
            </div>
          )}
        </div>
      )}
      {CardBlur ? CardBlur : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isPlaying: state.music.isPlaying,
  currentTrack: state.music.currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  playRadio: () => dispatch(playRadio()),
  emptySrc: () => dispatch(emptySrc()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
