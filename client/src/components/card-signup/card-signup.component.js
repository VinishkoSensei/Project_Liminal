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

  const [selectedItem, setSelectedItem] = useState(selectedItemInitialState);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };
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
  const Inputs = [
    {
      name: 'email',
      value: email,
      label: 'Email:',
      type: 'email',
      key: 'email',
    },
    {
      name: 'firstname',
      value: firstname,
      label: 'Firstname:',
      type: 'text',
      key: 'firstname',
    },
    {
      name: 'lastname',
      value: lastname,
      label: 'Lastname:',
      type: 'text',
      key: 'lastname',
    },
    {
      name: 'date',
      value: date,
      label: '',
      type: 'date',
      key: 'date',
    },
    {
      name: 'phone',
      value: phone,
      label: 'Phone:',
      type: 'tel',
      key: 'phone',
    },
    {
      name: 'password',
      value: password,
      label: 'Password:',
      type: 'password',
      key: 'password',
    },
    {
      name: 'passwordconf',
      value: passwordconf,
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

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(file.type);
      setSelectedItem({
        ...selectedItem,
        file: { image: getFileType(file.type), imagePreviewUrl: reader.result },
      });
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedItem);
    signUpStart(email, firstname, lastname, date, phone, file, password);
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
        <FormInput
          name="file"
          handleChange={fileSelectHandler}
          type="file"
          key="file"
          required
        />
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
/*
const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  playRadio: () => dispatch(playRadio()),
  emptySrc: () => dispatch(emptySrc()),
});*/

//export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, firstname, lastname, date, phone, file, password) =>
    dispatch(
      signUpStart(email, firstname, lastname, date, phone, file, password)
    ),
});

//export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
export default connect(mapStateToProps, mapDispatchToProps)(CardSignUp);
