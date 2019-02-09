import Reducer from '../modules'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// Logger Middleware
import { createLogger } from 'redux-logger'
// DevTools Extension Middleware
import { composeWithDevTools } from 'redux-devtools-extension'

import rootSaga from '../sagas'

// Redux-Saga Middleware
const sagaMiddleware = createSagaMiddleware(rootSaga);
// Redux-Logger Middleware
const loggerMiddleware = createLogger({ collapsed: true });

const store = createStore(
    Reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
);

sagaMiddleware.run(rootSaga)

export default store