import ProfileActionTypes from './user.types';

export const signInStart = (email, password) => ({
  type: ProfileActionTypes.SIGN_IN_START,
  payload: { email, password },
});

export const signInSuccess = (user) => ({
  type: ProfileActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (e) => ({
  type: ProfileActionTypes.SIGN_IN_FAILURE,
  payload: e,
});
