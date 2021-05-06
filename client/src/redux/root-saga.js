import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user.sagas';
import { notificationSagas } from './notification/notification.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(notificationSagas)]);
}
