import React from 'react';
import './homepage.styles.scss';
import LineTo from 'react-lineto';

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
          <div className="main-container">
            <div className="cards-container">
              <div className="cards top">
                <div className="card lt"></div>
                <div className="card rt"></div>
              </div>
              <div className="card-center">
                <div className="card-center-icon" />
              </div>
              <div className="cards bottom">
                <div className="card lb"></div>
                <div className="card rb"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="rightpanel">
          <div className="profile"></div>
          <div className="news"></div>
        </div>
      </div>
      <div className="footer"></div>
      <LineTo from="card-center-icon" to="card lt" toAnchor="bottom right" />
      <LineTo from="card-center-icon" to="card rt" toAnchor="bottom left" />
      <LineTo from="card-center-icon" to="card lb" toAnchor="top right" />
      <LineTo from="card-center-icon" to="card rb" toAnchor="top left" />
    </div>
  );
};

export default HomePage;
