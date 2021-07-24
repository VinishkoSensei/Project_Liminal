import React, { useState } from 'react';
import './card-user.styles.scss';
import { connect } from 'react-redux';
import CustomButton from 'components/shared/custombutton/custombutton.component';
import { changeUserStart } from 'redux/user/user.actions';
import FormInput from 'components/shared/forminputs/forminput/forminput.component';
import FormFileInput from 'components/shared/forminputs/formfileinput/formfileinput.component';
import { handleChange, handleChangeWithFunction } from 'utils/utils';
import { Trans } from '@lingui/macro';
import ReactCardFlip from 'react-card-flip';

const CardUser = ({ user, userExpanded, changeUserStart }) => {
  const [changedUser, setChangedUser] = useState({
    ...user,
    password: '',
    passwordconf: '',
  });
  const [changingItemType, setChangingItemType] = useState(null);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardData, setCardData] = useState({ owner: '', number: '', code: '' });

  const flipCards = () => setIsFlipped((prevIsFlipped) => !prevIsFlipped);

  const handleChangingItemType = (event) => {
    setChangingItemType(event.target.name);
  };

  const checkDoPasswordsMatch = (name, value) => {
    switch (name) {
      case 'password':
        setDoPasswordsMatch(value === changedUser.passwordconf);
        break;
      case 'passwordconf':
        setDoPasswordsMatch(value === changedUser.password);
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
    const { password, passwordconf } = changedUser;
    if (password === passwordconf && password !== '') {
      changeUserStart(changedUser, 'password');
    }
  };

  const handleFileChange = () => {
    if (changedUser.file.image) changeUserStart(changedUser, 'file');
  };

  const handleEditingFinish = () => {
    changeUserStart(changedUser, changingItemType);
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
      setChangedUser({
        ...changedUser,
        file: { image: getFileType(file.type), imagePreviewUrl: reader.result },
      });
    };
  };

  const InputsLeft = [
    {
      name: 'email',
      value: changedUser?.email,
      label: '',
      key: 'email',
      type: 'disabled',
    },
    {
      name: 'date',
      value: changedUser?.birth_date,
      label: '',
      key: 'date',
      type: 'disabled',
    },
    {
      name: 'first_name',
      value: changedUser?.first_name,
      label: <Trans>First name</Trans>,
      key: 'first_name',
      bordered: changingItemType !== 'first_name',
      disabled: changingItemType !== 'first_name',
      type: 'input',
    },
    {
      name: 'last_name',
      value: changedUser?.last_name,
      label: <Trans>Last name</Trans>,
      key: 'last_name',
      bordered: changingItemType !== 'last_name',
      disabled: changingItemType !== 'last_name',
      type: 'input',
    },
    {
      name: 'phone',
      value: changedUser?.phone,
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
      value: changedUser?.password,
      label: <Trans>Password</Trans>,
      key: 'password',
    },
    {
      name: 'passwordconf',
      type: 'password',
      value: changedUser?.passwordconf,
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
    <div className={`card-user${userExpanded ? ' expanded' : ''}`}>
      {user ? (
        <div className="card-user-main">
          <div className="card-user-image">
            <img
              src={`http://localhost:3001/getavatar/${user.avatar}`}
              alt="avatar"
            />
          </div>
          <ReactCardFlip
            isFlipped={isFlipped}
            flipSpeedBackToFront={2}
            flipSpeedFrontToBack={2}
            containerStyle={{ width: '100%', height: '60%' }}
          >
            <div className="user-info-main">
              <div className="user-info-main-columns">
                <div>
                  {InputsLeft.map((input) =>
                    input.type === 'disabled' ? (
                      <FormInput
                        name={input.name}
                        value={input.value ?? ''}
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
                        value={input.value ?? ''}
                        label={input.label}
                        handleChange={handleChange(changedUser, setChangedUser)}
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
                          changedUser,
                          setChangedUser,
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
            <div className="user-info-main">
              <div className="subscription-container">
                <div className="subscription">
                  {CardInputs.map((cardInput) => (
                    <FormInput
                      name={cardInput.name}
                      type={cardInput.type}
                      value={cardInput.value ?? ''}
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

const mapDispatchToProps = (dispatch) => ({
  changeUserStart: (changedUser, changingItemType) =>
    dispatch(changeUserStart(changedUser, changingItemType)),
});

export default connect(null, mapDispatchToProps)(CardUser);
