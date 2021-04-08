import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import musicReducer from './music/music.reducer';
import userReducer from './user/user.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['musicReducer', 'userReducer'],
};

const rootReducer = combineReducers({
  music: musicReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
