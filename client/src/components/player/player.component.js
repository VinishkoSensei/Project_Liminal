import React from 'react';
import './player.styles.scss';
import { connect } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {
  playNextTrack,
  changePlayingState,
} from '../../redux/music/music.actions';

const Player = ({ src, playNextTrack, changePlayingState, playerRef }) => {
  return (
    <div className="player-container">
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  src: state.music.src,
  isPlaying: state.music.isPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  changePlayingState: (isPlaying) => dispatch(changePlayingState(isPlaying)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
