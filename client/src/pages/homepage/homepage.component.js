import React, { useState } from 'react';
import './homepage.styles.scss';
import LineTo from 'react-lineto';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

import { profiledummy } from '../../dummies/profile-dummy';
import { tracksdummy } from '../../dummies/tracks-dummy';

import ChangingCards from '../../components/changingcards/changingcards.component';
import MainMenu from '../../components/mainmenu/mainmenu.component';

const HomePage = () => {
  const [changedCards, setChangedCards] = useState(false);
  const [minifiedProfile, setMinifiedProfile] = useState(false);
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
              <ChangingCards />
              {/* <MainMenu /> */}
            </div>
          </div>
        </div>
        <div className="rightpanel">
          <div
            className={`profile${minifiedProfile ? ' minified' : ''}`}
            onClick={() => setMinifiedProfile(!minifiedProfile)}
          >
            <div className="profile-icon-container">
              <img src={`/${profiledummy.photourl}`} alt="profileimage" />
              <div className="profile-info-minified">{profiledummy.name}</div>
            </div>
            <div className="profile-info">
              <div className="profile-info-minifying">{profiledummy.name}</div>
              <div className="profile-info-minifying">
                <i>{profiledummy.email}</i>
              </div>
              <div className="profile-info-minifying">
                {profiledummy.dateofbirth}
              </div>
              <div className="profile-info-minifying">
                {profiledummy.status}
              </div>
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
