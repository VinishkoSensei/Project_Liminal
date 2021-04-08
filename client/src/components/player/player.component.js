import React from 'react';
import './player.styles.scss';
import { connect } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { playNextTrack } from '../../redux/music/music.actions';

const Player = ({ src, playNextTrack }) => {
  return (
    <div className="player-container">
      <div className="player">
        <AudioPlayer
          id="audio"
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
        ></AudioPlayer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  src: state.music.src,
});

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
