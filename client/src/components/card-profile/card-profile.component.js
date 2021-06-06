import React, { useState, useEffect } from 'react';
import './card-profile.styles.scss';
import { connect } from 'react-redux';
import CustomButton from '../custombutton/custombutton.component';
import { changeProfileStart } from '../../redux/user/user.actions';
import FormInput from '../forminputs/forminput/forminput.component';
import FormFileInput from '../forminputs/formfileinput/formfileinput.component';
import { Trans } from '@lingui/macro';
import ReactCardFlip from 'react-card-flip';

const CardProfile = ({ profile, profileExpanded, changeProfileStart }) => {
  const [changedProfile, setChangedProfile] = useState(null);
  const [changingItemType, setChangingItemType] = useState(null);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [isFlipped, setIsFlipped] = useState(true);
  const [cardData, setCardData] = useState({ owner: '', number: '', code: '' });

  useEffect(() => {
    setChangedProfile({ ...profile, password: '', passwordconf: '' });
  }, [profile]);

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

  const handleCardChange = (event) => {
    const { value, name } = event.target;
    setCardData({ ...cardData, [name]: value });
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
          <ReactCardFlip
            isFlipped={isFlipped}
            flipSpeedBackToFront={2}
            flipSpeedFrontToBack={2}
            style={{
              width: '100%',
              height: '70%',
              marginTop: '20px',
            }}
            containerStyle={{ width: '100%', height: '100%' }}
          >
            <div className="profile-info-main">
              {changedProfile?.email ? (
                <div>
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
                  <FormFileInput handleChange={fileSelectHandler} key="file" />
                  <CustomButton type="button" onClick={handleFileChange}>
                    <Trans>Change photo</Trans>
                  </CustomButton>
                  <FormInput
                    name="first_name"
                    value={changedProfile.first_name}
                    label={<Trans>First name</Trans>}
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
                    label={<Trans>Last name</Trans>}
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
                    label={<Trans>Phone</Trans>}
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
                    label={<Trans>Password</Trans>}
                    handleChange={handleChange}
                    key="password"
                  />
                  <FormInput
                    name="passwordconf"
                    value={changedProfile.passwordconf}
                    label={<Trans>Password confirmation</Trans>}
                    type="password"
                    handleChange={handleChange}
                    key="passwordconf"
                  />
                  {!doPasswordsMatch ? (
                    <div className="error">
                      <Trans>Passwords do not match</Trans>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <CustomButton type="button" onClick={handlePasswordChange}>
                <Trans>Change password</Trans>
              </CustomButton>
            </div>
            <div className="profile-info-main">
              <div>
                <FormInput
                  name="number"
                  value={cardData.number}
                  label="Card Number"
                  key="number"
                  handleChange={handleCardChange}
                />
                <FormInput
                  name="owner"
                  value={cardData.owner}
                  label="Card Owner"
                  key="owner"
                  handleChange={handleCardChange}
                />
                <FormInput
                  name="code"
                  type="password"
                  value={cardData.code}
                  label="CVV/CVC"
                  key="code"
                  handleChange={handleCardChange}
                />
                <div className="buttons">
                  <CustomButton type="button">
                    <Trans>Pay</Trans>
                  </CustomButton>
                  <CustomButton type="button" abort>
                    <Trans>Cancel</Trans>
                  </CustomButton>
                </div>
              </div>
            </div>
          </ReactCardFlip>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  changeProfileStart: (changedProfile, changingItemType) =>
    dispatch(changeProfileStart(changedProfile, changingItemType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardProfile);
