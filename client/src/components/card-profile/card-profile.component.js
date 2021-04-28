import React from 'react';
import './card-profile.styles.scss';
import { connect } from 'react-redux';
import CustomButton from '../custombutton/custombutton.component';
import { signOutStart } from '../../redux/user/user.actions';

const CardProfile = ({
  changedCards,
  profile,
  profileExpanded,
  setProfileExpanded,
  signOutStart,
}) => {
  const handleSignOut = () => {
    setProfileExpanded(false);
    signOutStart();
  };

  return (
    <div className={`card-profile${profileExpanded ? ' expanded' : ''}`}>
      {profile ? (
        <div className="card-profile-main">
          <div className="card-profile-image">
            <img
              src={`http://localhost:3001/getprofileimage/${profile.avatar}`}
              alt="profileimage"
            />
          </div>
          <div className="profile-info-main">
            <div>
              {profile.first_name}&nbsp;{profile.last_name}
            </div>
            <div>
              <i>{profile.email}</i>
            </div>
            <div>{profile.birth_date}</div>
            <div>{profile.subscribed ? 'subscribed' : 'not subscribed'}</div>
            <CustomButton type="button" onClick={handleSignOut}>
              Sign Out
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
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardProfile);
