import { fork } from 'redux-saga/effects'
import { loginFlow, registerFlow, logoutFlow, authFlow } from './home'
import { getListFlow } from './friends'

export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(logoutFlow);
    yield fork(authFlow);
    yield fork(getListFlow)
}
