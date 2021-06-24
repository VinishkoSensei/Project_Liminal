import UserActionTypes from './user.types';

const INITIAL_STATE = {
  user: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
      };

    case UserActionTypes.CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case UserActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, user: null, error: null };

    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.CHANGE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
