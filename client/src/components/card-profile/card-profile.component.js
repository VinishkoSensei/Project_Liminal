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
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

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

  const checkDoPasswordsMatch = (name, value) => {
    switch (name) {
      case 'password':
        setDoPasswordsMatch(value === changedProfile.passwordconf);
        break;
      case 'passwordconf':
        setDoPasswordsMatch(value === changedProfile.password);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setChangedProfile({ ...changedProfile, [name]: value });
    checkDoPasswordsMatch(name, value);
  };

  const handlePasswordChange = () => {
    const { password, passwordconf } = changedProfile;
    if (password === passwordconf && password !== '') {
      changeProfileStart(changedProfile, 'password');
    }
  };

  const handleFileChange = () => {
    if (changedProfile.file.image) changeProfileStart(changedProfile, 'file');
  };

  const handleEditingFinish = () => {
    changeProfileStart(changedProfile, changingItemType);
    setChangingItemType(null);
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
                  handleChange={fileSelectHandler}
                  type="file"
                  key="file"
                />
                <CustomButton type="button" onClick={handleFileChange}>
                  Change photo
                </CustomButton>
                <FormInput
                  name="first_name"
                  value={changedProfile.first_name}
                  label="first_name"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  handleEditingFinish={handleEditingFinish}
                  key="first_name"
                  bordered={changingItemType !== 'first_name'}
                  disabled={changingItemType !== 'first_name'}
                />
                <FormInput
                  name="last_name"
                  value={changedProfile.last_name}
                  label="last_name"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  handleEditingFinish={handleEditingFinish}
                  key="last_name"
                  bordered={changingItemType !== 'last_name'}
                  disabled={changingItemType !== 'last_name'}
                />
                <FormInput
                  name="phone"
                  value={changedProfile.phone}
                  label="Phone"
                  handleChange={handleChange}
                  handleChangingItemType={handleChangingItemType}
                  handleEditingFinish={handleEditingFinish}
                  key="phone"
                  bordered={changingItemType !== 'phone'}
                  disabled={changingItemType !== 'phone'}
                />
                <FormInput
                  name="password"
                  type="password"
                  value={changedProfile.password}
                  label="password"
                  handleChange={handleChange}
                  key="password"
                />
                <FormInput
                  name="passwordconf"
                  value={changedProfile.passwordconf}
                  label="passwordconf"
                  type="password"
                  handleChange={handleChange}
                  key="passwordconf"
                />
              </div>
            ) : null}

            {!doPasswordsMatch ? (
              <div className="error">Passwords do not match</div>
            ) : null}
            <CustomButton type="button" onClick={handlePasswordChange}>
              Change password
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
