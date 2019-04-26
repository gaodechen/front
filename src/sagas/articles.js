import { put, take, call } from 'redux-saga/effects'
import { get, post, del } from '../api/request/request'

import { action_types as home_action_types, fetch_types } from '../modules/home'
import { action_types as articles_action_types } from '../modules/articles'
import status_code from '../api/request/status-code'

// 获取userID用户的文章列表
export function* getArticles(userID) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/article', { userID });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* getArticlesFlow() {
    while (true) {
        // 监听action，获取action参数
        let request = yield take(articles_action_types.GET_ARTICLES);
        const { userID } = request;
        let response = yield call(getArticles, userID);
        if (response && response.status === status_code.SUCCESS) {
            // list获取成功
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
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

// 获取id的收藏列表
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

export function* getArticleFlow() {
    // 监听action，获取action参数
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

// 为userID收藏musicID
export function* postArticle(userID, article) {
    let response;
    try {
        response = yield call(post, '/api/article', { _id: userID, article });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* postArticleFlow() {
    let request = yield take(articles_action_types.ADD_ARTICLE);
    const { userID, article } = request;
    let response = yield call(postArticle, userID, article);
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

// 删除id文章
export function* delArticle(articleID) {
    let response;
    try {
        response = yield call(del, '/api/article', { _id: articleID });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* deleteArticleFlow() {
    // 监听action，获取action参数
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
