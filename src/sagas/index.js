import { fork } from 'redux-saga/effects'
import { loginFlow, registerFlow, logoutFlow, authFlow } from './home'
import { getFollowFlow, postFollowFlow, deleteFollowFlow } from './friends'

export default function* rootSaga() {
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(logoutFlow);
    yield fork(authFlow);
    yield fork(getFollowFlow);
    yield fork(postFollowFlow);
    yield fork(deleteFollowFlow);
}
