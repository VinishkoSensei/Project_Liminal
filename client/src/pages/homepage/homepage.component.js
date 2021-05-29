import React, { useState, useRef, useEffect } from 'react';
import './homepage.styles.scss';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';
import ChangingCards from '../../components/changingcards/changingcards.component';
import MainMenu from '../../components/mainmenu/mainmenu.component';
import Profile from '../../components/profile/profile.component';
import CardMusic from '../../components/card-music/card-music.component';
import CardPlaylist from '../../components/card-playlist/card-playlist.component';
import CardSearch from '../../components/card-search/card-search.component';
import CardProfile from '../../components/card-profile/card-profile.component';
import CardSignIn from '../../components/card-signin/card-signin.component';
import CardSignUp from '../../components/card-signup/card-signup.component';
import CardAdmin from '../../components/card-admin/card-admin.component';
import CardTrackAnalysis from '../../components/card-track-analysis/card-track-analysis.component';


import ReactCardFlip from 'react-card-flip';

import NotificationContainer from '../../components/shared/notification/notification.container';

import { connect } from 'react-redux';
import { checkUserSession } from '../../redux/user/user.actions';

const HomePage = ({ profile, checkUserSession }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chosenCard, setChosenCard] = useState(null);
  const playerRef = useRef(null);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [selectedAdminItem, setSelectedAdminItem] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const FlipCard = (e) => {
    if (e.target.id) setChosenCard(e.target.id);
    setIsFlipped(!isFlipped);
  };

  const BtnBack = () => {
    return (
      <div
        className="btn-back"
        style={
          !isFlipped
            ? { display: 'none' }
            : { backgroundImage: `url('/images/${chosenCard}.svg')` }
        }
        onClick={FlipCard}
      />
    );
  };

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const openAdminCard = (item) => {
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
        <BtnBack />
        <div className="main-space">
          <div className="main-container">
            <div className="cards-container">
              {profile ? (
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
                    FlipCard={FlipCard}
                    openAdminCard={openAdminCard}
                    isOpened={isOpened}
                  />
                  {chosenCard === 'broadcast' ? (
                    <CardMusic isNotRadio={false} playerRef={playerRef} />
                  ) : (
                    <ChangingCards>
                      <CardMusic isNotRadio={true} playerRef={playerRef} />
                      {chosenCard === 'ai' || chosenCard === 'playlist' ? (
                        <CardPlaylist />
                      ) : (
                        <CardSearch />
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
          <Profile
            setProfileExpanded={setProfileExpanded}
            profileExpanded={profileExpanded}
            openAdminCard={openAdminCard}
            isOpened={isOpened}
          />
          <div className="news"></div>
        </div>
      </div>
      <CardProfile
        profileExpanded={profileExpanded}
        setProfileExpanded={setProfileExpanded}
      />
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
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
