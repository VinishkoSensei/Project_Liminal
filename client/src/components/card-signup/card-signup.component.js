import React, { useState } from 'react';
import CustomButton from '../custombutton/custombutton.component';
import FormInput from '../forminput/forminput.component';
import './card-signup.styles.scss';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

const CardSignUp = ({ changedCards, signUpStart, error }) => {
  const selectedItemInitialState = {
    email: '',
    firstname: '',
    lastname: '',
    date: '',
    phone: '',
    file: '',
    password: '',
    passwordconf: '',
  };

  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);

  const [selectedItem, setSelectedItem] = useState(selectedItemInitialState);
  const {
    email,
    firstname,
    lastname,
    date,
    phone,
    file,
    password,
    passwordconf,
  } = selectedItem;

  const checkDoPasswordsMatch = (name, value) => {
    switch (name) {
      case 'password':
        setDoPasswordsMatch(value === selectedItem.passwordconf);
        break;
      case 'passwordconf':
        setDoPasswordsMatch(value === selectedItem.password);
        break;
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
    checkDoPasswordsMatch(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    signUpStart(email, firstname, lastname, date, phone, file, password);
  };

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedItem({
        ...selectedItem,
        file: { image: getFileType(file.type), imagePreviewUrl: reader.result },
      });
    };
  };

  const Inputs = [
    {
      name: 'email',
      value: email,
      label: 'Email:',
      handleChange: handleChange,
      type: 'email',
      key: 'email',
    },
    {
      name: 'firstname',
      value: firstname,
      label: 'Firstname:',
      handleChange: handleChange,
      type: 'text',
      key: 'firstname',
    },
    {
      name: 'lastname',
      value: lastname,
      label: 'Lastname:',
      handleChange: handleChange,
      type: 'text',
      key: 'lastname',
    },
    {
      name: 'date',
      value: date,
      label: '',
      handleChange: handleChange,
      type: 'date',
      key: 'date',
    },
    {
      name: 'phone',
      value: phone,
      label: 'Phone:',
      handleChange: handleChange,
      type: 'tel',
      key: 'phone',
    },
    {
      name: 'file',
      value: '',
      label: '',
      handleChange: fileSelectHandler,
      type: 'file',
      key: 'file',
    },
    {
      name: 'password',
      value: password,
      label: 'Password:',
      handleChange: handleChange,
      type: 'password',
      key: 'password',
    },
    {
      name: 'passwordconf',
      value: passwordconf,
      handleChange: handleChange,
      label: 'Password confirmation:',
      type: 'password',
      key: 'passwordconf',
    },
  ];

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

  return (
    <div className="card-signup">
      <form method="post" onSubmit={handleSubmit}>
        {Inputs.map((input) => (
          <FormInput
            name={input.name}
            value={input.value}
            label={input.label}
            handleChange={handleChange}
            type={input.type}
            key={input.key}
            required
          />
        ))}
        {!doPasswordsMatch ? (
          <div className="error">Passwords do not match</div>
        ) : null}
        <CustomButton type="submit">Sign Up</CustomButton>
        {error ? <div className="error">{error}</div> : null}
      </form>

      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, firstname, lastname, date, phone, file, password) =>
    dispatch(
      signUpStart(email, firstname, lastname, date, phone, file, password)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSignUp);
