import ProfileActionTypes from './user.types';

const INITIAL_STATE = {
  profile: null,
  error: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfileActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        profile: action.payload.user,
        error: null,
      };

    case ProfileActionTypes.CHANGE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null,
      };

    case ProfileActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, profile: null, error: null };

    case ProfileActionTypes.SIGN_IN_FAILURE:
    case ProfileActionTypes.SIGN_OUT_FAILURE:
    case ProfileActionTypes.SIGN_UP_FAILURE:
    case ProfileActionTypes.CHANGE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
