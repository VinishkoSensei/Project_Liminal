import React, { useState, useEffect } from 'react';
import './card-profile.styles.scss';
import { connect } from 'react-redux';
import CustomButton from 'components/custombutton/custombutton.component';
import { changeProfileStart } from 'redux/user/user.actions';
import FormInput from 'components/forminputs/forminput/forminput.component';
import FormFileInput from 'components/forminputs/formfileinput/formfileinput.component';
import { handleChange, handleChangeWithFunction } from 'utils/utils';
import { Trans } from '@lingui/macro';
import ReactCardFlip from 'react-card-flip';

const CardProfile = ({ profile, profileExpanded, changeProfileStart }) => {
  const [changedProfile, setChangedProfile] = useState(null);
  const [changingItemType, setChangingItemType] = useState(null);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardData, setCardData] = useState({ owner: '', number: '', code: '' });

  useEffect(() => {
    setChangedProfile({ ...profile, password: '', passwordconf: '' });
  }, [profile]);

  const flipCards = () => setIsFlipped((prevIsFlipped) => !prevIsFlipped);

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

  const InputsLeft = [
    {
      name: 'email',
      value: changedProfile?.email,
      label: '',
      key: 'email',
      type: 'disabled',
    },
    {
      name: 'date',
      value: changedProfile?.birth_date,
      label: '',
      key: 'date',
      type: 'disabled',
    },
    {
      name: 'first_name',
      value: changedProfile?.first_name,
      label: <Trans>First name</Trans>,
      key: 'first_name',
      bordered: changingItemType !== 'first_name',
      disabled: changingItemType !== 'first_name',
      type: 'input',
    },
    {
      name: 'last_name',
      value: changedProfile?.last_name,
      label: <Trans>Last name</Trans>,
      key: 'last_name',
      bordered: changingItemType !== 'last_name',
      disabled: changingItemType !== 'last_name',
      type: 'input',
    },
    {
      name: 'phone',
      value: changedProfile?.phone,
      label: <Trans>Phone</Trans>,
      key: 'phone',
      bordered: changingItemType !== 'phone',
      disabled: changingItemType !== 'phone',
      type: 'input',
    },
  ];

  const InputsRight = [
    {
      name: 'file',
      label: '',
      handleChange: fileSelectHandler,
      type: 'file',
      key: 'file',
    },
    {
      type: 'button',
      handleClick: handleFileChange,
      label: <Trans>Change photo</Trans>,
      key: 'button',
    },
    {
      name: 'password',
      type: 'password',
      value: changedProfile?.password,
      label: <Trans>Password</Trans>,
      key: 'password',
    },
    {
      name: 'passwordconf',
      type: 'password',
      value: changedProfile?.passwordconf,
      label: <Trans>Password confirmation</Trans>,
      key: 'passwordconf',
    },
  ];

  const CardInputs = [
    {
      name: 'number',
      value: cardData.number,
      label: 'Card Number',
      key: 'number',
      type: 'password',
    },
    {
      name: 'owner',
      value: cardData.owner,
      label: 'Card Owner',
      key: 'owner',
      type: 'input',
    },
    {
      name: 'code',
      value: cardData.code,
      label: 'CVV/CVC',
      key: 'code',
      type: 'password',
    },
  ];

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
            containerStyle={{ width: '100%', height: '60%' }}
          >
            <div className="profile-info-main">
              <div className="profile-info-main-columns">
                <div>
                  {InputsLeft.map((input) =>
                    input.type === 'disabled' ? (
                      <FormInput
                        name={input.name}
                        value={input.value || ''}
                        label={input.label}
                        key={input.key}
                        disabled
                      />
                    ) : input.type === 'button' ? (
                      <CustomButton
                        type="button"
                        onClick={input.handleClick}
                        key={input.key}
                      >
                        {input.label}
                      </CustomButton>
                    ) : (
                      <FormInput
                        name={input.name}
                        value={input.value || ''}
                        label={input.label}
                        handleChange={handleChange(
                          changedProfile,
                          setChangedProfile
                        )}
                        handleChangingItemType={handleChangingItemType}
                        handleEditingFinish={handleEditingFinish}
                        bordered={changingItemType !== input.name}
                        disabled={changingItemType !== input.name}
                        key={input.key}
                      />
                    )
                  )}
                  <CustomButton type="button" onClick={flipCards}>
                    <Trans>Subscription</Trans>
                  </CustomButton>
                </div>
                <div>
                  {InputsRight.map((input) =>
                    input.type === 'file' ? (
                      <FormFileInput
                        handleChange={input.handleChange}
                        key={input.key}
                      />
                    ) : input.type === 'button' ? (
                      <CustomButton
                        type="button"
                        onClick={input.handleClick}
                        key={input.key}
                      >
                        {input.label}
                      </CustomButton>
                    ) : (
                      <FormInput
                        name={input.name}
                        value={input.value}
                        label={input.label}
                        type="password"
                        handleChange={handleChangeWithFunction(
                          changedProfile,
                          setChangedProfile,
                          checkDoPasswordsMatch
                        )}
                        key={input.key}
                      />
                    )
                  )}
                  {!doPasswordsMatch ? (
                    <div className="error">
                      <Trans>Passwords do not match</Trans>
                    </div>
                  ) : null}
                  <CustomButton type="button" onClick={handlePasswordChange}>
                    <Trans>Change password</Trans>
                  </CustomButton>
                </div>
              </div>
            </div>
            <div className="profile-info-main">
              <div className="subscription-container">
                <div className="subscription">
                  {CardInputs.map((cardInput) => (
                    <FormInput
                      name={cardInput.name}
                      type={cardInput.type}
                      value={cardInput.value || ''}
                      label={cardInput.label}
                      key={cardInput.key}
                      handleChange={handleCardChange}
                    />
                  ))}

                  <div className="buttons">
                    <CustomButton type="button">
                      <Trans>Pay</Trans>
                    </CustomButton>
                    <CustomButton type="button" onClick={flipCards} abort>
                      <Trans>Cancel</Trans>
                    </CustomButton>
                  </div>
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
