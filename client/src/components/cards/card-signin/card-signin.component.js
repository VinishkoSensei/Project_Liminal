import React, { useState } from 'react';
import CustomButton from 'components/shared/custombutton/custombutton.component';
import FormInput from 'components/shared/forminputs/forminput/forminput.component';
import './card-signin.styles.scss';
import { connect } from 'react-redux';
import { signInStart } from 'redux/user/user.actions';
import { handleChange } from 'utils/utils';
import { Trans } from '@lingui/macro';

const CardSignIn = ({ signInStart, CardBlur }) => {
  const selectedItemInitialState = {
    email: '',
    password: '',
  };

  const [selectedItem, setSelectedItem] = useState(selectedItemInitialState);
  const { email, password } = selectedItem;
  const Inputs = [
    {
      name: 'email',
      value: email,
      label: <Trans>Email</Trans>,
      type: 'email',
      key: 'email',
    },
    {
      name: 'password',
      value: password,
      label: <Trans>Password</Trans>,
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
            handleChange={handleChange(selectedItem, setSelectedItem)}
            type={input.type}
            key={input.key}
            required
          />
        ))}
        <CustomButton type="submit">
          <Trans>Sign In</Trans>
        </CustomButton>
      </form>
      {CardBlur ? CardBlur : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
});

export default connect(null, mapDispatchToProps)(CardSignIn);
