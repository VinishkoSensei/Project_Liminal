import React from 'react';
import './mainmenu.styles.scss';

const MainMenu = () => {
  return (
    <div className="mainmenu-cards-container">
      <div className="cards top">
        <div className="card lt">
          <div className="card-image-container">
            <img src="/images/ai.svg" alt="ai" />
          </div>
        </div>
        <div className="card rt">
          <div className="card-image-container">
            <img src="/images/broadcast.svg" alt="broadcast" />
          </div>
        </div>
      </div>
      <div className="card-center">
        <div className="card-center-icon" />
      </div>
      <div className="cards bottom">
        <div className="card lb">
          <div className="card-image-container">
            <img src="/images/playlist.svg" alt="playlist" />
          </div>
        </div>
        <div className="card rb">
          <div className="card-image-container">
            <img src="/images/music.svg" alt="music" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
