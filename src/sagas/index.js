import { fork } from 'redux-saga/effects'
import * as homeSagas from './home'
import * as followSagas from './friends'
import * as articlesSagas from './articles'
import * as styleTransferSagas from './styleTransfer'
import * as transcriptionSagas from './transcription'
import * as recommendSagas from './recommend'

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
    yield fork(homeSagas.updateFlow);
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
    yield fork(styleTransferSagas.processFlow);
    // transcription sagas
    yield fork(transcriptionSagas.transcriptionFlow)
    yield fork(transcriptionSagas.midi2xmlFlow)
    // recommendation sagas
    yield fork(recommendSagas.getRecommendFlow)
}
