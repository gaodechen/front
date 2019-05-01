import { fork } from 'redux-saga/effects'
import * as homeSagas from './home'
import { getFollowFlow, postFollowFlow, deleteFollowFlow } from './friends'
// import { getCollectionsFlow, postCollectionFlow, deleteCollectionFlow } from './recommend'
import { getArticlesFlow, getArticleFlow, postArticleFlow, deleteArticleFlow } from './articles'

/**
 * @description root saga of front end
 * @export
 */
export default function* rootSaga() {
    // home sagas
    console.log(homeSagas)
    yield fork(homeSagas.loginFlow);
    yield fork(homeSagas.registerFlow);
    yield fork(homeSagas.logoutFlow);
    yield fork(homeSagas.authFlow);
    // follow sagas
    yield fork(getFollowFlow);
    yield fork(postFollowFlow);
    yield fork(deleteFollowFlow);
    // articles sagas
    yield fork(getArticlesFlow);
    yield fork(getArticleFlow);
    yield fork(postArticleFlow);
    yield fork(deleteArticleFlow);
}
