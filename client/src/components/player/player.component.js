import React from 'react';
import './player.styles.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ src, setSrc, playlist }) => {
  const onTrackEnded = () => {
    const nextTrack = playlist.shift();
    setSrc(`http://localhost:3001/tracks/${nextTrack.id}`);
  };

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
          onEnded={onTrackEnded}
        ></AudioPlayer>
      </div>
    </div>
  );
};

export default Player;
