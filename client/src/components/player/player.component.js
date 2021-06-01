import React from 'react';
import './player.styles.scss';
import { connect } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {
  playNextTrack,
  changePlayingState,
} from '../../redux/music/music.actions';

const Player = ({
  src,
  playNextTrack,
  changePlayingState,
  playerRef,
  profile,
  suggestedPoints,
}) => {
  if (playerRef && playerRef.current && suggestedPoints) {
    const audio = playerRef.current.audio.current;
    audio.ontimeupdate = (e) => {
      const volume = suggestedPoints.reduce((acc, point) => {
        if (
          e.target.currentTime >= point.start &&
          e.target.currentTime < point.end
        )
          return ((point.end - e.target.currentTime) * 0.07 + 0.3).toFixed(2);
        return acc;
      }, 0);
      audio.volume = volume ? volume : 1;
    };
  }

  return (
    <div className={`player-container${profile ? ' opened' : ''}`}>
      {profile ? (
        <div className="player">
          <AudioPlayer
            id="audio"
            ref={playerRef}
            src={src}
            loop={false}
            preload="none"
            autoplay="false"
            customVolumeControls={[]}
            customAdditionalControls={[]}
            showJumpControls={false}
            defaultCurrentTime=""
            defaultDuration=""
            onEnded={playNextTrack}
            onPlay={() => changePlayingState(true)}
            onPause={() => changePlayingState(false)}
          ></AudioPlayer>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  src: state.music.src,
  suggestedPoints: state.music.currentTrack.suggestedPoints,
  isPlaying: state.music.isPlaying,
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  changePlayingState: (isPlaying) => dispatch(changePlayingState(isPlaying)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
