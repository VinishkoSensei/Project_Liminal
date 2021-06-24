import React from 'react';
import './mainmenu.styles.scss';
import SmallButton from 'components/shared/small-button/small-button.component';
import { connect } from 'react-redux';

const MainMenu = ({ user, flipCard, openAdminCard, isOpened }) => {
  return (
    <div className="mainmenu-cards-container">
      <div className="cards top">
        <div
          className="card lt"
          id="ai"
          onClick={flipCard}
          style={{ backgroundImage: `url('/images/ai.svg')` }}
        ></div>
        <div
          className="card rt"
          id="broadcast"
          onClick={flipCard}
          style={{ backgroundImage: `url('/images/broadcast.svg')` }}
        ></div>
        {user.isadmin ? (
          <SmallButton
            onClick={openAdminCard('playlist')}
            isHidden={isOpened}
          />
        ) : null}
      </div>
      <div className="card-center">
        <div className="card-center-icon" />
      </div>
      <div className="cards bottom">
        <div
          className="card lb"
          id="playlist"
          onClick={flipCard}
          style={{ backgroundImage: `url('/images/playlist.svg')` }}
        ></div>
        <div
          className="card rb"
          id="music"
          onClick={flipCard}
          style={{ backgroundImage: `url('/images/music.svg')` }}
        ></div>
        {user.isadmin ? (
          <SmallButton onClick={openAdminCard('track')} isHidden={isOpened} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(MainMenu);
