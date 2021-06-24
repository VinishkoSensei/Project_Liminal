import UserActionTypes from './user.types';

export const signInStart = (email, password) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: { email, password },
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error.message,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
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
  type: UserActionTypes.SIGN_UP_START,
  payload: { email, firstname, lastname, date, phone, file, password },
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error.message,
});

export const changeUserStart = (user, changingItemType) => ({
  type: UserActionTypes.CHANGE_PROFILE_START,
  payload: { user, changingItemType },
});

export const changeUserSuccess = (user) => ({
  type: UserActionTypes.CHANGE_PROFILE_SUCCESS,
  payload: user,
});

export const changeUserFailure = (error) => ({
  type: UserActionTypes.CHANGE_PROFILE_FAILURE,
  payload: error.message,
});
