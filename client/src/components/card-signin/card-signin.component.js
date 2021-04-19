import React, { useState } from 'react';
import CustomButton from '../custombutton/custombutton.component';
import FormInput from '../forminput/forminput.component';
import './card-signin.styles.scss';
import { connect } from 'react-redux';
import { signInStart } from '../../redux/user/user.actions';

const CardSignIn = ({ changedCards, signInStart }) => {
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
      key: 'email',
    },
    {
      name: 'password',
      value: password,
      label: 'Password:',
      type: 'password',
      key: 'password',
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    signInStart(email, password);
  };

  return (
    <div className="card-signin">
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
*/
const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
});

//export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
export default connect(null, mapDispatchToProps)(CardSignIn);
