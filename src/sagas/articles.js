import { put, take, call } from 'redux-saga/effects'
import { get, post, del } from '../api/request/request'

import { action_types as home_action_types, fetch_types } from '../modules/home'
import { action_types as articles_action_types } from '../modules/articles'
import status_code from '../api/request/status-code'

/**
 * @description get articles list of userId
 * @export
 * @param {*} userId
 * @returns
 */
export function* getArticles(userId) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        // get /article request
        response = yield call(get, '/api/article', { userId });
    } catch (err) {
        // error happens
        response = err.response;
    } finally {
        // update fetching status
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

/**
 * @description monotor getArticles opt
 * @export
 */
export function* getArticlesFlow() {
    while (true) {
        let request = yield take(articles_action_types.GET_ARTICLES);
        const { userId } = request;
        let response = yield call(getArticles, userId);
        if (response && response.status === status_code.SUCCESS) {
            // set response
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            // set article list to store
            yield put({
                type: articles_action_types.SET_ARTICLES,
                recList: response.data.data
            });
        } else {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}

/**
 * @description get article detail with article id
 * @export
 * @param {*} id
 * @returns
 */
export function* getArticle(id) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/article', { _id: id });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

/**
 * @description monitor getArticle opt
 * @export
 */
export function* getArticleFlow() {
    let request = yield take(articles_action_types.GET_ARTICLE);
    const { id } = request;
    let response = yield call(getArticle, id);
    if (response && response.status === status_code.SUCCESS) {
        // 获取成功
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.SUCCEED,
            msgContent: response.data.message
        });
        yield put({
        });
    } else
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.FAILED,
            msgContent: response.data.message
        });
}

/**
 * @description post article with userId and article info
 * @export
 * @param {*} userId
 * @param {*} article
 * @returns
 */
export function* postArticle(userId, article) {
    let response;
    try {
        response = yield call(post, '/api/article', { _id: userId, article });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

/**
 * @description monitor post action
 * @export
 */
export function* postArticleFlow() {
    let request = yield take(articles_action_types.ADD_ARTICLE);
    const { userId, article } = request;
    let response = yield call(postArticle, userId, article);
    if (response && response.status === status_code.SUCCESS) {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.SUCCEED,
            msgContent: response.data.message
        });
    } else {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.FAILED,
            msgContent: response.data.message
        });
    }
}

export function* delArticle(articleId) {
    let response;
    try {
        response = yield call(del, '/api/article', { _id: articleId });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* deleteArticleFlow() {
    let request = yield take(articles_action_types.DEL_ARTICLE);
    const { id } = request;
    let response = yield call(delArticle, id);
    if (response && response.status === status_code.SUCCESS) {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.SUCCEED,
            msgContent: response.data.message
        });
    } else {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.FAILED,
            msgContent: response.data.message
        });
    }
}
