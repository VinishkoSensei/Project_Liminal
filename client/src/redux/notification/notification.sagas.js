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
import ProfileActionTypes from '../user/user.types';
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

export function* createSuccessNotifyForProfileChange({ payload }) {
  yield put(
    addNotificationStart(
      <Trans>
        Successfully updated your profile, {payload.first_name}{' '}
        {payload.last_name}
      </Trans>,
      NotificationTypes.SUCCESS
    )
  );
}

export function* createSuccessNotifyForSignOut() {
  yield put(addNotificationStart(`Bye!`, NotificationTypes.SUCCESS));
}

export function* createSuccessNotifyForSignUp({ payload }) {
  yield put(
    addNotificationStart(
      <Trans>
        Welcome, {payload.firstname} {payload.lastname}
      </Trans>,
      NotificationTypes.SUCCESS
    )
  );
}

export function* createSuccessNotifyForSignIn({ payload: { user } }) {
  yield put(
    addNotificationStart(
      <Trans>
        Welcome back, {user.first_name} {user.last_name}
      </Trans>,
      NotificationTypes.SUCCESS
    )
  );
}

export function* createErrorNotify(error) {
  yield put(addNotificationStart(error.payload, NotificationTypes.ERROR));
}

export function* onChangeProfileSucceeded() {
  yield takeLatest(
    ProfileActionTypes.CHANGE_PROFILE_SUCCESS,
    createSuccessNotifyForProfileChange
  );
}
export function* onSignOutSucceeded() {
  yield takeLatest(
    ProfileActionTypes.SIGN_OUT_SUCCESS,
    createSuccessNotifyForSignOut
  );
}
export function* onSignUpSucceeded() {
  yield takeLatest(
    ProfileActionTypes.SIGN_UP_SUCCESS,
    createSuccessNotifyForSignUp
  );
}

export function* onSignInSucceeded() {
  yield takeLatest(
    ProfileActionTypes.SIGN_IN_SUCCESS,
    createSuccessNotifyForSignIn
  );
}

export function* onChangeProfileFailed() {
  yield takeLatest(
    ProfileActionTypes.CHANGE_PROFILE_FAILURE,
    createErrorNotify
  );
}

export function* onSignOutFailed() {
  yield takeLatest(ProfileActionTypes.SIGN_OUT_FAILURE, createErrorNotify);
}

export function* onSignUpFailed() {
  yield takeLatest(ProfileActionTypes.SIGN_UP_FAILURE, createErrorNotify);
}

export function* onSignInFailed() {
  yield takeLatest(ProfileActionTypes.SIGN_IN_FAILURE, createErrorNotify);
}

export function* notificationSagas() {
  yield all([
    call(onNotificationAddStart),
    call(onNotificationHideStart),
    call(onSignInFailed),
    call(onSignUpFailed),
    call(onSignOutFailed),
    call(onChangeProfileFailed),
    call(onSignInSucceeded),
    call(onSignUpSucceeded),
    call(onSignOutSucceeded),
    call(onChangeProfileSucceeded),
  ]);
}
