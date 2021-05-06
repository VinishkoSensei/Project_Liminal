import { takeEvery, put, all, call } from 'redux-saga/effects';
import NotificationActionTypes from './notification.types';
import {
  deleteNotification,
  addNotificationSuccess,
  hideNotificationSuccess,
} from './notification.actions';
import _ from 'lodash';

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function* onNotificationAdding({ payload: { text, type } }) {
  try {
    const id = _.uniqueId();
    yield put(
      addNotificationSuccess({
        notification: {
          key: id,
          text,
          type,
          status: '',
        },
      })
    );
    yield timeout(5000);
    yield put(deleteNotification(id));
  } catch (e) {
    console.log('Couldn`t add notification');
  }
}

export function* onNotificationHiding({ payload: { key } }) {
  try {
    yield put(hideNotificationSuccess(key));
    yield timeout(500);
    yield put(deleteNotification(key));
  } catch (e) {
    console.log('Couldn`t hide notification');
  }
}

export function* onNotificationAddStart() {
  yield takeEvery(
    NotificationActionTypes.NOTIFICATION_ADD_START,
    onNotificationAdding
  );
}

export function* onNotificationHideStart() {
  yield takeEvery(
    NotificationActionTypes.NOTIFICATION_HIDE_START,
    onNotificationHiding
  );
}

export function* notificationSagas() {
  yield all([call(onNotificationAddStart), call(onNotificationHideStart)]);
}
