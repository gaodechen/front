import { fork } from 'redux-saga/effects'
import * as homeSagas from './home'
import * as followSagas from './friends'
import * as articlesSagas from './articles'
import * as styleTransferSagas from './styleTransfer'

/**
 * @description root saga of front end
 * @export
 */
export default function* rootSaga() {
    // home sagas
    yield fork(homeSagas.loginFlow);
    yield fork(homeSagas.registerFlow);
    yield fork(homeSagas.logoutFlow);
    yield fork(homeSagas.authFlow);
    yield fork(homeSagas.getUserInfoFlow);
    // follow sagas
    yield fork(followSagas.getFollowFlow);
    yield fork(followSagas.postFollowFlow);
    yield fork(followSagas.deleteFollowFlow);
    // articles sagas
    yield fork(articlesSagas.getArticlesFlow);
    yield fork(articlesSagas.getArticleFlow);
    yield fork(articlesSagas.postArticleFlow);
    yield fork(articlesSagas.deleteArticleFlow);
    // style transfer sagas
    yield fork(styleTransferSagas.inferenceFlow);
}
