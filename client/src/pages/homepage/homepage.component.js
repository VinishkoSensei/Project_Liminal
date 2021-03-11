import React, { useState } from 'react';
import './homepage.styles.scss';
import LineTo from 'react-lineto';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

import { profiledummy } from '../../dummies/profile-dummy';
import { tracksdummy } from '../../dummies/tracks-dummy';

import ChangingCards from '../../components/changingcards/changingcards.component';
import MainMenu from '../../components/mainmenu/mainmenu.component';
import Profile from '../../components/profile/profile.component';

const HomePage = () => {
  const [changedCards, setChangedCards] = useState(false);
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
          <Profile />
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
