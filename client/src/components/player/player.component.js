import React from 'react';
import './player.styles.scss';

const Player = () => {
  return (
    <div className="player-container">
      <div className="player">
        <audio controls>
          <source src="audio/sample.mp3" />
        </audio>
      </div>
    </div>
  );
};

export default Player;
