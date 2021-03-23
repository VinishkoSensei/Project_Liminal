import React, { useState } from 'react';
import './homepage.styles.scss';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

import MainMenuLines from '../../components/mainmenu-lines/mainmenu-lines.component';
import ChangingCards from '../../components/changingcards/changingcards.component';
import MainMenu from '../../components/mainmenu/mainmenu.component';
import Profile from '../../components/profile/profile.component';
import CardMusic from '../../components/card-music/card-music.component';
import CardPlaylist from '../../components/card-playlist/card-playlist.component';
import CardSearch from '../../components/card-search/card-search.component';

import ReactCardFlip from 'react-card-flip';

const HomePage = () => {
  const [isFlipped, setIsFlipped] = useState(true);
  const [chosenCard, setChosenCard] = useState(null);

  const FlipCard = (e) => {
    //setChosenCard(e.target.id);
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="main">
      <div className="toppart">
        <Header />
        <Player />
      </div>
      <div className="main-part">
        <button
          style={!isFlipped ? { display: 'none' } : {}}
          onClick={FlipCard}
        />
        <div className="main-space">
          <div className="main-container">
            <div className="cards-container">
              <ReactCardFlip
                isFlipped={isFlipped}
                flipSpeedBackToFront={2}
                flipSpeedFrontToBack={2}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                containerStyle={{ width: '100%', height: '100%' }}
              >
                <MainMenu FlipCard={FlipCard} />
                <ChangingCards>
                  <CardMusic />
                  <CardPlaylist />
                </ChangingCards>
              </ReactCardFlip>
            </div>
          </div>
        </div>
        <div className="rightpanel">
          <Profile />
          <div className="news"></div>
        </div>
      </div>
      <div className="footer"></div>
      {/*<MainMenuLines />*/}
    </div>
  );
};

export default HomePage;
