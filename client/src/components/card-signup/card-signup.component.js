import React, { useState } from 'react';
import CustomButton from '../custombutton/custombutton.component';
import FormInput from '../forminput/forminput.component';
import './card-signup.styles.scss';
import { connect } from 'react-redux';

const CardSignUp = ({ changedCards }) => {
  const selectedItemInitialState = {
    email: '',
    firstname: '',
    lastname: '',
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
    },
    {
      name: 'firstname',
      value: firstname,
      label: 'Firstname:',
      type: 'text',
    },
    {
      name: 'lastname',
      value: lastname,
      label: 'Lastname:',
      type: 'text',
    },
    {
      name: 'file',
      value: file,
      label: '',
      type: 'file',
    },
    {
      name: 'password',
      value: password,
      label: 'Password:',
      type: 'password',
    },
    {
      name: 'passwordconf',
      value: passwordconf,
      label: 'Password confirmation:',
      type: 'password',
    },
  ];

  return (
    <div className="card-signup">
      <form method="post">
        {Inputs.map((input) => (
          <FormInput
            name={input.name}
            value={input.value}
            label={input.label}
            handleChange={handleChange}
            type={input.type}
            required
          />
        ))}
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`} />
    </div>
  );
};
/*
const mapStateToProps = (state) => ({
  isPlaying: state.music.isPlaying,
  currentTrack: state.music.currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  playRadio: () => dispatch(playRadio()),
  emptySrc: () => dispatch(emptySrc()),
});*/

//export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
export default CardSignUp;
