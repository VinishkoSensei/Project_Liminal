import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signOutFailure,
  changeUserSuccess,
  changeUserFailure,
} from './user.actions';
import {
  handleSignIn,
  handleSignUp,
  handleGetUser,
  handleChangeUser,
} from './user.utils';

const saveAuthTokenInSession = (token) => {
  window.sessionStorage.setItem('token', token);
  //document.cookie = `token=${token};max-age=604800;domain=localhost:3000`;
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
      const resp = yield handleGetUser(res.userId, res.token);
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
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signIn);
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
    yield put(signUpSuccess({ email, password, firstname, lastname }));
  } catch (e) {
    yield put(signUpFailure(e));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
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
        const resp = yield handleGetUser(res.userId, res.token);
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
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAutentificated);
}

export function* signOut() {
  try {
    yield deleteAuthTokenFromSession();
    yield put(signOutSuccess());
  } catch (e) {
    put(signOutFailure(e));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* changeUser({ payload }) {
  const token = window.sessionStorage.getItem('token');
  try {
    const { changingItemType } = payload;
    const newuser = yield handleChangeUser(
      payload.user.id,
      payload.user[changingItemType],
      changingItemType,
      token
    );
    if (!newuser.ok) {
      const res = yield newuser.json();
      throw new Error(res.message);
    }
    const user = yield newuser.json();
    yield put(changeUserSuccess(user));
  } catch (e) {
    put(changeUserFailure(e));
  }
}

export function* onChangeUserStart() {
  yield takeLatest(UserActionTypes.CHANGE_PROFILE_START, changeUser);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onCheckUserSession),
    call(onSignUpSuccess),
    call(onSignOutStart),
    call(onChangeUserStart),
  ]);
}
