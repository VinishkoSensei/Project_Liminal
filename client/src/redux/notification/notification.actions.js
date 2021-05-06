import NotificationActionTypes from './notification.types';

export const addNotificationStart = (text, type) => ({
  type: NotificationActionTypes.NOTIFICATION_ADD_START,
  payload: { text, type },
});

export const addNotificationSuccess = (notification) => ({
  type: NotificationActionTypes.NOTIFICATION_ADD_SUCCESS,
  payload: notification,
});

export const hideNotificationStart = (key) => ({
  type: NotificationActionTypes.NOTIFICATION_HIDE_START,
  payload: { key },
});

export const hideNotificationSuccess = (key) => ({
  type: NotificationActionTypes.NOTIFICATION_HIDE_SUCCESS,
  payload: key,
});

export const deleteNotification = (key) => ({
  type: NotificationActionTypes.NOTIFICATION_DELETE,
  payload: key,
});
