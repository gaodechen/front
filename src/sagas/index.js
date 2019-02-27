import { fork } from 'redux-saga/effects'
import { loginFlow, registerFlow, logoutFlow, authFlow } from './home'
import { getFollowFlow, postFollowFlow, deleteFollowFlow } from './friends'
import { getRecommendFlow, getCollectionsFlow, addCollectionFlow } from './recommend'
import { getArticlesFlow, getArticleFlow, postArticleFlow, delArticleFlow } from './articles'

export default function* rootSaga() {
    // 登陆态异步请求
    yield fork(loginFlow);
    yield fork(registerFlow);
    yield fork(logoutFlow);
    yield fork(authFlow);
    // 关注/粉丝异步请求
    yield fork(getFollowFlow);
    yield fork(postFollowFlow);
    yield fork(deleteFollowFlow);
    // 收藏/推送异步请求
    yield fork(getRecommendFlow);
    yield fork(getCollectionsFlow);
    yield fork(addCollectionFlow);
    // 文章异步请求
    yield fork(getArticlesFlow);
    yield fork(getArticleFlow);
    yield fork(postArticleFlow);
    yield fork(delArticleFlow);
}
