import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const sharedMiddlewares = [sagaMiddleware];
const devMiddlewares = [logger];

const middlewares =
  process.env.NODE_ENV !== 'production'
    ? [...devMiddlewares, ...sharedMiddlewares]
    : [...sharedMiddlewares];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
