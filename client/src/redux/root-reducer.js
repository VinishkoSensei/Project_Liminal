import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import musicReducer from './music/music.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['musicReducer'],
};

const rootReducer = combineReducers({
  user: musicReducer,
});

export default persistReducer(persistConfig, rootReducer);
