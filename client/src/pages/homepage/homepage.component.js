import React, { useState } from 'react';
import './homepage.styles.scss';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

import { profiledummy } from '../../dummies/profile-dummy';
import { tracksdummy } from '../../dummies/tracks-dummy';
import MainMenuLines from '../../components/mainmenu-lines/mainmenu-lines.component';

import ChangingCards from '../../components/changingcards/changingcards.component';
import MainMenu from '../../components/mainmenu/mainmenu.component';
import Profile from '../../components/profile/profile.component';

const HomePage = () => {
  const [changedCards, setChangedCards] = useState(false);

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
              {/*<ChangingCards />*/}
              <MainMenu />
            </div>
          </div>
        </div>
        <div className="rightpanel">
          <Profile />
          <div className="news"></div>
        </div>
      </div>
      <div className="footer"></div>
      <MainMenuLines />
    </div>
  );
};

export default HomePage;
