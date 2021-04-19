import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProfileActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

export function* signIn({ payload: { email, password } }) {
  try {
    const userdata = yield fetch(`http://localhost:3001/getprofile`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const user = yield userdata.json();
    yield put(
      signInSuccess({
        user: user,
      })
    );
  } catch (e) {
    put(signInFailure(e));
  }
}

export function* onSignInStart() {
  yield takeLatest(ProfileActionTypes.SIGN_UP_SUCCESS, onSignUpSuccess);
}

export function* signInAfterSignUp({ payload: { email, password } }) {
  try {
    const userdata = yield fetch(`http://localhost:3001/getprofile`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const user = yield userdata.json();
    yield put(
      signInSuccess({
        user: user,
      })
    );
  } catch (e) {
    put(signInFailure(e));
  }
}

export function* onSignUpSuccess() {
  yield takeLatest(ProfileActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signUp({
  payload: { email, firstname, lastname, date, phone, password },
}) {
  try {
    yield fetch(`http://localhost:3001/createprofile`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        firstname: firstname,
        lastname: lastname,
        date: date,
        phone: phone,
        password: password,
      }),
    });
    yield put(signUpSuccess({ email, password }));
  } catch (e) {
    yield put(signUpFailure(e));
  }
}

export function* onSignUpStart() {
  yield takeLatest(ProfileActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([call(onSignInStart), call(onSignUpStart), call(onSignUpSuccess)]);
}
