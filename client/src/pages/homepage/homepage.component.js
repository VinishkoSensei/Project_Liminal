import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import './homepage.styles.scss';

import Header from 'components/header/header.component';
import Player from 'components/player/player.component';
import MainMenu from 'components/mainmenu/mainmenu.component';
import CardMusic from 'components/cards/card-music/card-music.component';
import CardAi from 'components/cards/card-ai/card-ai.component';
import CardPlaylistOrd from 'components/cards/cards-playlist/card-playlist-ord/card-playlist-ord.component';
import SearchTracks from 'components/cards/cards-search/card-search-tracks/search-tracks.component';
import BackButton from 'components/shared/back-button/back-button.component';
import ReactCardFlip from 'react-card-flip';
import Spinner from 'components/shared/with-spinner/spinner/spinner.component';
import Review from 'components/review/review.component';
import { connect } from 'react-redux';
import { checkUserSession } from 'redux/user/user.actions';

const CardUser = lazy(() =>
  import('components/cards/card-user/card-user.component')
);
const CardAdmin = lazy(() =>
  import('components/cards/card-admin/card-admin.component')
);
const NotificationContainer = lazy(() =>
  import('components/shared/notification/notification.container')
);
const ChangingCards = lazy(() =>
  import('components/changingcards/changingcards.component')
);
const User = lazy(() => import('components/user/user.component'));
const CardSignIn = lazy(() =>
  import('components/cards/card-signin/card-signin.component')
);
const CardSignUp = lazy(() =>
  import('components/cards/card-signup/card-signup.component')
);

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
      <Suspense fallback={<Spinner />}>
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

        {user ? (
          <CardUser
            user={user}
            userExpanded={userExpanded}
            setUserExpanded={setUserExpanded}
          />
        ) : null}

        {user && user.isadmin ? (
          <CardAdmin
            selectedAdminItem={selectedAdminItem}
            setSelectedAdminItem={setSelectedAdminItem}
            isOpened={isOpened}
            setIsOpened={setIsOpened}
          />
        ) : null}

        <NotificationContainer />
      </Suspense>
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
