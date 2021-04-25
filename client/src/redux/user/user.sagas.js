import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProfileActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';
import { handleSignIn, handleSignUp, handleGetProfile } from './user.utils';

const saveAuthTokenInSession = (token) => {
  window.sessionStorage.setItem('token', token);
};

const deleteAuthTokenFromSession = () => {
  window.sessionStorage.removeItem('token');
};

export function* signIn({ payload: { email, password } }) {
  const response = yield handleSignIn({ userCredentials: { email, password } });
  try {
    const res = yield response.json();
    if (!response.ok) {
      throw new Error(res.message);
    } else {
      yield saveAuthTokenInSession(res.token);
      const resp = yield handleGetProfile(res.userId, res.token);
      const re = yield resp.json();
      yield put(
        signInSuccess({
          user: re,
        })
      );
    }
  } catch (e) {
    yield put(signInFailure(e));
  }
}

export function* onSignInStart() {
  yield takeLatest(ProfileActionTypes.SIGN_IN_START, signIn);
}

export function* onSignUpSuccess() {
  yield takeLatest(ProfileActionTypes.SIGN_UP_SUCCESS, signIn);
}

export function* signUp({
  payload: { email, firstname, lastname, date, phone, file, password },
}) {
  const response = yield handleSignUp(
    email,
    firstname,
    lastname,
    date,
    phone,
    file,
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

export function* isUserAutentificated() {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    const response = yield handleSignIn({ token });
    try {
      const res = yield response.json();
      if (!response.ok) {
        throw new Error(res.message);
      } else {
        const resp = yield handleGetProfile(res.userId, res.token);
        if (!resp.ok) {
          const res = yield resp.json();
          yield deleteAuthTokenFromSession();
          throw new Error(res.message);
        }
        const re = yield resp.json();
        yield put(
          signInSuccess({
            user: re,
          })
        );
      }
    } catch (e) {
      yield put(signInFailure(e));
    }
  } else yield put(signInFailure({ message: 'No token' }));
}

export function* onCheckUserSession() {
  yield takeLatest(ProfileActionTypes.CHECK_USER_SESSION, isUserAutentificated);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onCheckUserSession),
    call(onSignUpSuccess),
  ]);
}
