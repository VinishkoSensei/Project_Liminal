import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProfileActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';
import { handleSignIn } from './user.utils';

export function* signIn({ payload: { email, password } }) {
  try {
    const user = yield handleSignIn(email, password);
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
    const user = yield handleSignIn(email, password);
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
    const response = yield fetch(`http://localhost:3001/createprofile`, {
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
    if (!response.ok) {
      const res = yield response.json();
      throw new Error(res.message);
    }
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
