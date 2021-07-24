import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import musicReducer from './music/music.reducer';
import userReducer from './user/user.reducer';
import notificationReducer from './notification/notification.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['musicReducer'],
};

const rootReducer = combineReducers({
  music: musicReducer,
  user: userReducer,
  notification: notificationReducer,
});

export default persistReducer(persistConfig, rootReducer);
