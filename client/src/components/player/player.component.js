import React from 'react';
import './player.styles.scss';

const Player = () => {
  return (
    <div className="player-container">
      <div className="player">
        {/*<audio controls>
          <source src="localhost:3001/stream" />
        </audio>*/}
        <audio
          id="audio"
          src="http://localhost:3001/stream"
          preload="none"
          controls
        ></audio>
      </div>
    </div>
  );
};

export default Player;
