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
  const [changingItemType, setChangingItemType] = useState(null);

  useEffect(() => {
    setChangedProfile({ ...profile, password: '', passwordconf: '' });
  }, [profile]);

  const handleSignOut = () => {
    setProfileExpanded(false);
    signOutStart();
  };

  const handleChangingItemType = (event) => {
    setChangingItemType(event.target.name);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setChangedProfile({ ...changedProfile, [name]: value });
  };

  const getFileType = (filetype) => {
    switch (filetype) {
      case 'image/jpeg':
        return '.jpg';
      case 'image/svg+xml':
        return '.svg';
      case 'vnd.microsoft.icon':
        return '.ico';
      case 'png':
        return '.png';
      default:
        return '.dat';
    }
  };

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setChangedProfile({
        ...changedProfile,
        file: { image: getFileType(file.type), imagePreviewUrl: reader.result },
      });
    };
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
            {changedProfile.email ? (
              <div>
                <FormInput
                  name="subscribed"
                  value={`${
                    changedProfile.subscribed ? 'subscribed' : 'unsubscribed'
                  }`}
                  label=""
                  key="subscribed"
                  disabled
                />
                <FormInput
                  name="email"
                  value={changedProfile.email}
                  label=""
                  key="email"
                  disabled
                />
                <FormInput
                  name="date"
                  value={changedProfile.birth_date}
                  label=""
                  key="date"
                  disabled
                />
                <FormInput
                  name="file"
                  label=""
                  value=""
                  handleChange={fileSelectHandler}
                  type="file"
                  key="file"
                />
                <FormInput
                  name="firstname"
                  value={changedProfile.first_name}
                  label="firstname"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  key="firstname"
                  bordered={changingItemType !== 'firstname'}
                  disabled={changingItemType !== 'firstname'}
                />
                <FormInput
                  name="lastname"
                  value={changedProfile.last_name}
                  label="lastname"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  key="lastname"
                  bordered={changingItemType !== 'lastname'}
                  disabled={changingItemType !== 'lastname'}
                />
                <FormInput
                  name="phone"
                  value={changedProfile.phone}
                  label="Phone"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  key="phone"
                  bordered={changingItemType !== 'phone'}
                  disabled={changingItemType !== 'phone'}
                />
                <FormInput
                  name="password"
                  value=""
                  label="password"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  key="password"
                  bordered={
                    changingItemType !== 'password' &&
                    changingItemType !== 'passwordconf'
                  }
                  disabled={
                    changingItemType !== 'password' &&
                    changingItemType !== 'passwordconf'
                  }
                />
                <FormInput
                  name="passwordconf"
                  value=""
                  label="passwordconf"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  key="passwordconf"
                  bordered={
                    changingItemType !== 'password' &&
                    changingItemType !== 'passwordconf'
                  }
                  disabled={
                    changingItemType !== 'password' &&
                    changingItemType !== 'passwordconf'
                  }
                />
              </div>
            ) : null}
            <CustomButton
              type="button"
              onClick={() =>
                changeProfileStart(changedProfile, changingItemType)
              }
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
  changeProfileStart: (changedProfile, changingItemType) =>
    dispatch(changeProfileStart(changedProfile, changingItemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardProfile);
