import { takeLatest, put, all, call } from 'redux-saga/effects';
import ProfileActionTypes from './user.types';
import { signInSuccess, signInFailure } from './user.actions';

export function* signIn({ payload: { email, password } }) {
  try {
    const userdata = yield fetch(`http://localhost:3001/getprofile`);
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
  yield takeLatest(ProfileActionTypes.SIGN_IN_START, signIn);
}

export function* userSagas() {
  yield all([call(onSignInStart)]);
}
