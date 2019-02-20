import rootReducer from '../modules'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'                     // Logger Middleware
import { composeWithDevTools } from 'redux-devtools-extension'  // DevTools Extension Middleware
import createSagaMiddleware from 'redux-saga'

import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware(rootSaga);          // Redux-Saga Middleware
const loggerMiddleware = createLogger({ collapsed: true });     // Redux-Logger Middleware
const middlewares = [sagaMiddleware, loggerMiddleware];         // Middlewares

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga)

export default store