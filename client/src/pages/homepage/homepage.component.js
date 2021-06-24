import React, { useState, useRef, useEffect } from 'react';
import './homepage.styles.scss';

import Header from 'components/header/header.component';
import Player from 'components/player/player.component';
import ChangingCards from 'components/changingcards/changingcards.component';
import MainMenu from 'components/mainmenu/mainmenu.component';
import User from 'components/user/user.component';
import CardMusic from 'components/cards/card-music/card-music.component';
import CardAi from 'components/cards/card-ai/card-ai.component';
import CardPlaylistOrd from 'components/cards/cards-playlist/card-playlist-ord/card-playlist-ord.component';
import SearchTracks from 'components/cards/cards-search/card-search-tracks/search-tracks.component';
import CardUser from 'components/cards/card-user/card-user.component';
import CardSignIn from 'components/cards/card-signin/card-signin.component';
import CardSignUp from 'components/cards/card-signup/card-signup.component';
import CardAdmin from 'components/cards/card-admin/card-admin.component';
import BackButton from 'components/shared/back-button/back-button.component';

import ReactCardFlip from 'react-card-flip';

import NotificationContainer from 'components/shared/notification/notification.container';

import { connect } from 'react-redux';
import { checkUserSession } from 'redux/user/user.actions';
import Review from 'components/review/review.component';

const HomePage = ({ user, checkUserSession }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenCard, setChosenCard] = useState(null);
  const playerRef = useRef(null);
  const [userExpanded, setUserExpanded] = useState(false);
  const [selectedAdminItem, setSelectedAdminItem] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const flipCard = (e) => {
    if (e.target.id) setChosenCard(e.target.id);
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const openAdminCard = (item) => () => {
    setSelectedAdminItem(item);
    setIsOpened(true);
  };

  return (
    <div className="main">
      <div className="toppart">
        <Header />
        <Player playerRef={playerRef} />
      </div>
      <div className="main-part">
        {isFlipped ? (
          <BackButton
            imageUrl={`/images/${chosenCard}.svg`}
            handleClick={flipCard}
          />
        ) : null}
        <div className="main-space">
          <div className="main-container">
            <div className="cards-container">
              {user ? (
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
                  <MainMenu
                    flipCard={flipCard}
                    openAdminCard={openAdminCard}
                    isOpened={isOpened}
                  />

                  {chosenCard === 'broadcast' ? (
                    <CardMusic isNotRadio={false} playerRef={playerRef} />
                  ) : chosenCard === 'ai' ? (
                    <CardAi />
                  ) : (
                    <ChangingCards>
                      <CardMusic isNotRadio={true} playerRef={playerRef} />
                      {chosenCard === 'playlist' ? (
                        <CardPlaylistOrd />
                      ) : (
                        <SearchTracks />
                      )}
                    </ChangingCards>
                  )}
                </ReactCardFlip>
              ) : (
                <div className="auth">
                  <ChangingCards>
                    <CardSignIn />
                    <CardSignUp />
                  </ChangingCards>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="rightpanel">
          <User
            setUserExpanded={setUserExpanded}
            userExpanded={userExpanded}
            openAdminCard={openAdminCard}
            isOpened={isOpened}
          />
          {user ? <Review /> : null}
        </div>
      </div>

      <CardUser userExpanded={userExpanded} setUserExpanded={setUserExpanded} />
      <CardAdmin
        selectedAdminItem={selectedAdminItem}
        setSelectedAdminItem={setSelectedAdminItem}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />
      <NotificationContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
