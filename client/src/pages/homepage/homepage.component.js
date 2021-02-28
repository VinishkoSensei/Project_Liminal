import React, { useState } from 'react';
import './homepage.styles.scss';
import LineTo from 'react-lineto';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

import { profiledummy } from '../../dummies/profile-dummy';

const HomePage = () => {
  const [windowSize, setWindowSize] = useState(
    window.innerWidth * window.innerHeight
  );
  window.addEventListener('resize', () =>
    setWindowSize(window.innerWidth * window.innerHeight)
  );

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
          <div className="profile">
            <div className="profile-icon-container">
              <img src={`/${profiledummy.photourl}`} alt="profileimage" />
            </div>
            <div className="profile-info">
              <p>{profiledummy.name}</p>
              <p>
                <i>{profiledummy.email}</i>
              </p>
              <p>{profiledummy.dateofbirth}</p>
              <p>{profiledummy.status}</p>
            </div>
          </div>
          <div className="news"></div>
        </div>
      </div>
      <div className="footer"></div>
      <LineTo
        from="card-center-icon"
        to="card lt"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
      <LineTo
        from="card-center-icon"
        to="card rt"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
      <LineTo
        from="card-center-icon"
        to="card lb"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
      <LineTo
        from="card-center-icon"
        to="card rb"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
    </div>
  );
};

export default HomePage;
