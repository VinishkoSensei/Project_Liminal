import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProfileActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';
import { handleSignIn, handleSignUp } from './user.utils';

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
  yield takeLatest(ProfileActionTypes.SIGN_IN_START, signIn);
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
  const response = yield handleSignUp(
    email,
    firstname,
    lastname,
    date,
    phone,
    password
  );
  try {
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
