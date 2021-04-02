import React, { useState } from 'react';
import './homepage.styles.scss';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

import ChangingCards from '../../components/changingcards/changingcards.component';
import MainMenu from '../../components/mainmenu/mainmenu.component';
import Profile from '../../components/profile/profile.component';
import CardMusic from '../../components/card-music/card-music.component';
import CardPlaylist from '../../components/card-playlist/card-playlist.component';
import CardSearch from '../../components/card-search/card-search.component';

import ReactCardFlip from 'react-card-flip';

const HomePage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenCard, setChosenCard] = useState(null);
  const [src, setSrc] = useState();
  const [playlist, setPlaylist] = useState([]);

  const FlipCard = (e) => {
    if (e.target.id) setChosenCard(e.target.id);
    setIsFlipped(!isFlipped);
  };

  const addTrackToPlaylistEnd = (id) => {
    playlist.push(id);
  };

  const addTrackToPlaylistStart = (id) => {
    playlist.unshift(id);
  };

  return (
    <div className="main">
      <div className="toppart">
        <Header />
        <Player src={src} setSrc={setSrc} playlist={playlist} />
      </div>
      <div className="main-part">
        <div
          className="btn-back"
          style={
            !isFlipped
              ? { display: 'none' }
              : { backgroundImage: `url('/images/play.svg')` }
          }
          onClick={FlipCard}
        ></div>
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
                {chosenCard === 'broadcast' ? (
                  <CardMusic isNotRadio={false} setSrc={setSrc} />
                ) : (
                  <ChangingCards>
                    <CardMusic isNotRadio={true} />
                    {chosenCard === 'ai' || chosenCard === 'playlist' ? (
                      <CardPlaylist
                        setSrc={setSrc}
                        playlist={playlist}
                        setPlaylist={setPlaylist}
                        addTrackToPlaylistEnd={addTrackToPlaylistEnd}
                        addTrackToPlaylistStart={addTrackToPlaylistStart}
                      />
                    ) : (
                      <CardSearch
                        playlist={playlist}
                        addTrackToPlaylistEnd={addTrackToPlaylistEnd}
                        addTrackToPlaylistStart={addTrackToPlaylistStart}
                      />
                    )}
                  </ChangingCards>
                )}
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
    </div>
  );
};

export default HomePage;
