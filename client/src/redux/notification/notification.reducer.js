import NotificationActionTypes from './notification.types';

const INITIAL_STATE = {
  notificationArray: [],
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationActionTypes.NOTIFICATION_ADD_SUCCESS:
      const newNotificationArray = [
        ...state.notificationArray,
        action.payload.notification,
      ];
      return {
        ...state,
        notificationArray: newNotificationArray,
      };

    case NotificationActionTypes.NOTIFICATION_HIDE_SUCCESS:
      const hideNotArray = state.notificationArray.map((el) =>
        el.key === action.payload ? { ...el, status: 'closing' } : el
      );

      return {
        ...state,
        notificationArray: hideNotArray,
      };

    case NotificationActionTypes.NOTIFICATION_DELETE:
      return {
        ...state,
        notificationArray: state.notificationArray.filter((el) => {
          return el.key !== action.payload;
        }),
      };

    default:
      return state;
  }
};

export default notificationReducer;
