import { fork } from 'redux-saga/effects'
import { loginFlow, registerFlow, logoutFlow } from './home'

export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(logoutFlow);
}
