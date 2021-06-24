import { takeEvery, takeLatest, put, all, call } from 'redux-saga/effects';
import NotificationActionTypes, {
  NotificationTypes,
} from './notification.types';
import {
  deleteNotification,
  addNotificationSuccess,
  hideNotificationSuccess,
  addNotificationStart,
} from './notification.actions';
import UserActionTypes from '../user/user.types';
import _ from 'lodash';
import { Trans } from '@lingui/macro';

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
  yield takeLatest(
    NotificationActionTypes.NOTIFICATION_HIDE_START,
    onNotificationHiding
  );
}

export function* createSuccessNotifyForUserChange({ payload }) {
  yield put(
    addNotificationStart(
      <Trans>
        Successfully updated your user, {payload.first_name} {payload.last_name}
      </Trans>,
      NotificationTypes.SUCCESS
    )
  );
}

export function* createSuccessNotifyForSignOut() {
  yield put(addNotificationStart(`Bye!`, NotificationTypes.SUCCESS));
}

export function* createSuccessNotifyForSignIn({ payload: { user } }) {
  yield put(
    addNotificationStart(
      <Trans>
        Welcome, {user.first_name} {user.last_name}
      </Trans>,
      NotificationTypes.SUCCESS
    )
  );
}

export function* createErrorNotify(error) {
  yield put(addNotificationStart(error.payload, NotificationTypes.ERROR));
}

export function* onChangeUserSucceeded() {
  yield takeLatest(
    UserActionTypes.CHANGE_PROFILE_SUCCESS,
    createSuccessNotifyForUserChange
  );
}

export function* onSignOutSucceeded() {
  yield takeLatest(
    UserActionTypes.SIGN_OUT_SUCCESS,
    createSuccessNotifyForSignOut
  );
}

export function* onSignInSucceeded() {
  yield takeLatest(
    UserActionTypes.SIGN_IN_SUCCESS,
    createSuccessNotifyForSignIn
  );
}

export function* onChangeUserFailed() {
  yield takeLatest(UserActionTypes.CHANGE_PROFILE_FAILURE, createErrorNotify);
}

export function* onSignOutFailed() {
  yield takeLatest(UserActionTypes.SIGN_OUT_FAILURE, createErrorNotify);
}

export function* onSignUpFailed() {
  yield takeLatest(UserActionTypes.SIGN_UP_FAILURE, createErrorNotify);
}

export function* onSignInFailed() {
  yield takeLatest(UserActionTypes.SIGN_IN_FAILURE, createErrorNotify);
}

export function* notificationSagas() {
  yield all([
    call(onNotificationAddStart),
    call(onNotificationHideStart),
    call(onSignInFailed),
    call(onSignUpFailed),
    call(onSignOutFailed),
    call(onChangeUserFailed),
    call(onSignInSucceeded),
    call(onSignOutSucceeded),
    call(onChangeUserSucceeded),
  ]);
}
