import React, { useState, useEffect } from 'react';
import './card-profile.styles.scss';
import { connect } from 'react-redux';
import CustomButton from '../custombutton/custombutton.component';
import {
  signOutStart,
  changeProfileStart,
} from '../../redux/user/user.actions';
import FormInput from '../forminput/forminput.component';

const CardProfile = ({
  profile,
  profileExpanded,
  setProfileExpanded,
  signOutStart,
  changeProfileStart,
}) => {
  const [changedProfile, setChangedProfile] = useState(null);

  useEffect(() => {
    setChangedProfile(profile);
  }, [profile]);

  const handleSignOut = () => {
    setProfileExpanded(false);
    signOutStart();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setChangedProfile({ ...changedProfile, [name]: value });
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
            <div>{profile.phone}</div>
            {changedProfile ? (
              <FormInput
                name="phone"
                value={changedProfile.phone}
                label="Phone"
                handleChange={handleChange}
                key="phone"
                required
              />
            ) : null}
            <div>{profile.birth_date}</div>
            <div>{profile.subscribed ? 'subscribed' : 'not subscribed'}</div>
            <CustomButton
              type="button"
              onClick={() => changeProfileStart(changedProfile)}
            >
              Change
            </CustomButton>
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
  changeProfileStart: (changedProfile) =>
    dispatch(changeProfileStart(changedProfile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardProfile);
