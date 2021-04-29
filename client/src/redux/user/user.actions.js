import ProfileActionTypes from './user.types';

export const signInStart = (email, password) => ({
  type: ProfileActionTypes.SIGN_IN_START,
  payload: { email, password },
});

export const signInSuccess = (user) => ({
  type: ProfileActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: ProfileActionTypes.SIGN_IN_FAILURE,
  payload: error.message,
});

export const signOutStart = () => ({
  type: ProfileActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: ProfileActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: ProfileActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (
  email,
  firstname,
  lastname,
  date,
  phone,
  file,
  password
) => ({
  type: ProfileActionTypes.SIGN_UP_START,
  payload: { email, firstname, lastname, date, phone, file, password },
});

export const checkUserSession = () => ({
  type: ProfileActionTypes.CHECK_USER_SESSION,
});

export const signUpSuccess = (profile) => ({
  type: ProfileActionTypes.SIGN_UP_SUCCESS,
  payload: profile,
});

export const signUpFailure = (error) => ({
  type: ProfileActionTypes.SIGN_UP_FAILURE,
  payload: error.message,
});

export const changeProfileStart = (profile) => ({
  type: ProfileActionTypes.CHANGE_PROFILE_START,
  payload: profile,
});

export const changeProfileSuccess = (profile) => ({
  type: ProfileActionTypes.CHANGE_PROFILE_SUCCESS,
  payload: profile,
});

export const changeProfileFailure = (error) => ({
  type: ProfileActionTypes.CHANGE_PROFILE_FAILURE,
  payload: error.message,
});
