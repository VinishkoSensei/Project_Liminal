import React from 'react';
import './homepage.styles.scss';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

const HomePage = () => {
  return (
    <div className="main">
      <div className="toppart">
        <Header />
        <Player />
      </div>
      <div className="main-part">
        <div className="main-space">
          <div className="main-container">123</div>
        </div>
        <div className="rightpanel">
          <div className="profile"></div>
          <div className="news"></div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default HomePage;
