import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './user.styles.scss';
import CustomButton from 'components/shared/custombutton/custombutton.component';
import SmallButton from 'components/shared/small-button/small-button.component';
import { signInStart, signOutStart } from 'redux/user/user.actions';
import { Trans } from '@lingui/macro';

const User = ({
  user,
  setUserExpanded,
  userExpanded,
  openAdminCard,
  isOpened,
  signOutStart,
}) => {
  const [minifiedUser, setMinifiedUser] = useState(true);

  useEffect(() => {
    if (!user) setUserExpanded(false);
  }, [user, setUserExpanded]);

  const handleImgError = (e) => {
    e.target.onError = null;
    e.target.src = 'images/sampleavatar.svg';
  };

  const handleSignOut = () => {
    setUserExpanded(false);
    signOutStart();
  };

  return (
    <div>
      {user ? (
        <div className="user-panel">
          {user.isadmin ? (
            <SmallButton onClick={openAdminCard('users')} isHidden={isOpened} />
          ) : null}
          <div
            className={`user-main`}
            onClick={() => setMinifiedUser(!minifiedUser)}
          >
            <div className="user-icon-container">
              <img
                src={`http://localhost:3001/getuseravatar/${user.avatar}`}
                alt="avatar"
                onError={handleImgError}
              />
            </div>
            <div className="user-info-main">
              {user.first_name}&nbsp;{user.last_name}
            </div>
          </div>
          <div
            className={`user-info${minifiedUser ? ' minified' : ''}`}
            onClick={() =>
              setUserExpanded((prevUserExpanded) => !prevUserExpanded)
            }
          >
            <div>
              <i>{user.email}</i>
            </div>
            <div>{user.birth_date}</div>
            <div>
              {user.subscribed ? (
                <Trans>Subscribed</Trans>
              ) : (
                <Trans>Not subscribed</Trans>
              )}
            </div>
            <CustomButton type="button" onClick={handleSignOut} abort>
              <Trans>Sign Out</Trans>
            </CustomButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
