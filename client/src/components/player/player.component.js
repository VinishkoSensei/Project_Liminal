import React from 'react';
import './player.styles.scss';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Player = ({ src }) => {
  return (
    <div className="player-container">
      <div className="player">
        {/*<audio controls>
          <source src="localhost:3001/stream" />
        </audio>*/}
        <AudioPlayer
          id="audio"
          //src="http://localhost:3001/track"
          src={src}
          loop={true}
          preload="none"
          autoplay="false"
          customVolumeControls={[]}
          customAdditionalControls={[]}
          showJumpControls={false}
          defaultCurrentTime=""
          defaultDuration=""
        ></AudioPlayer>
      </div>
    </div>
  );
};

export default Player;
