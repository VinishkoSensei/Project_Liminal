import React, { useState } from 'react';
import CustomButton from '../custombutton/custombutton.component';
import FormInput from '../forminput/forminput.component';
import './card-signin.styles.scss';
import { connect } from 'react-redux';

const CardSignIn = ({ changedCards }) => {
  const selectedItemInitialState = {
    email: '',
    password: '',
  };

  const [selectedItem, setSelectedItem] = useState(selectedItemInitialState);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setSelectedItem({ ...selectedItem, [name]: value });
  };
  const { email, password } = selectedItem;
  const Inputs = [
    {
      name: 'email',
      value: email,
      label: 'Email:',
      type: 'email',
    },
    {
      name: 'password',
      value: password,
      label: 'Password:',
      type: 'password',
    },
  ];

  return (
    <div className="card-signin">
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
        <CustomButton type="submit">Sign In</CustomButton>
      </form>
      <div className={`card-big-blur${changedCards ? '' : ' disabled'}`}></div>
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
export default CardSignIn;
