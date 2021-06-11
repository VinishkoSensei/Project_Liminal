import React, { useState } from 'react';
import { connect } from 'react-redux';
import './profile.styles.scss';
import CustomButton from '../custombutton/custombutton.component';
import SmallButton from '../shared/small-button/small-button.component';
import { signInStart, signOutStart } from '../../redux/user/user.actions';
import { Trans } from '@lingui/macro';

const Profile = ({
  profile,
  setProfileExpanded,
  profileExpanded,
  openAdminCard,
  isOpened,
  signOutStart,
}) => {
  const [minifiedProfile, setMinifiedProfile] = useState(true);

  const handleImgError = (e) => {
    e.target.onError = null;
    e.target.src = 'images/emptyprofile.svg';
  };

  const handleSignOut = () => {
    setProfileExpanded(false);
    signOutStart();
  };

  return (
    <div>
      {profile ? (
        <div className="profile-panel">
          {profile.isadmin ? (
            <SmallButton onClick={openAdminCard('users')} isHidden={isOpened} />
          ) : null}
          <div
            className={`profile-main`}
            onClick={() => setMinifiedProfile(!minifiedProfile)}
          >
            <div className="profile-icon-container">
              <img
                src={`http://localhost:3001/getprofileimage/${profile.avatar}`}
                alt="profileimage"
                onError={handleImgError}
              />
            </div>
            <div className="profile-info-main">
              {profile.first_name}&nbsp;{profile.last_name}
            </div>
          </div>
          <div
            className={`profile-info${minifiedProfile ? ' minified' : ''}`}
            onClick={() => setProfileExpanded(!profileExpanded)}
          >
            <div>
              <i>{profile.email}</i>
            </div>
            <div>{profile.birth_date}</div>
            <div>
              {profile.subscribed ? (
                <Trans>Subscribed</Trans>
              ) : (
                <Trans>Not subscribed</Trans>
              )}
            </div>
            <CustomButton type="button" onClick={handleSignOut}>
              <Trans>Sign Out</Trans>
            </CustomButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
