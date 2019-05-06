import { put, take, call } from 'redux-saga/effects'
import { get, post, del } from '../api/request/request'

import { action_types as home_action_types, fetch_types } from '../modules/home'
import { action_types as recommend_action_types } from '../modules/recommend'
import status_code from '../api/request/status-code'

export function* getRecommend(id, recType, recNum) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/recommend', { _id: id, recType, recNum });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* getRecommendFlow() {
    while (true) {
        let request = yield take(recommend_action_types.GET_RECOMMEND);
        const { id, recType, recNum } = request;
        let response = yield call(getRecommend, id, recType, recNum);
        if (response && response.status === status_code.SUCCESS) {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            yield put({
                type: recommend_action_types.SET_RECOMMEND,
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

export function* getCollections(id) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/like', { _id: id });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* getCollectionsFlow() {
    let request = yield take(recommend_action_types.GET_COLLECTIONS);
    const { id } = request;
    let response = yield call(getCollections, id);
    if (response && response.status === status_code.SUCCESS) {
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.SUCCEED,
            msgContent: response.data.message
        });
    } else
        yield put({
            type: home_action_types.SET_MSG,
            msgType: fetch_types.FAILED,
            msgContent: response.data.message
        });
}

export function* postCollection(userID, likedID) {
    let response;
    try {
        response = yield call(post, '/api/like', { _id: userID, likedID });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* postCollectionFlow() {
    let request = yield take(recommend_action_types.ADD_COLLECTION);
    const { userID, likedID } = request;
    let response = yield call(postCollectionFlow, userID, likedID);
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

export function* delCollection(userID, likedID) {
    let response;
    try {
        response = yield call(del, '/api/like', { _id: userID, likedID });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* deleteCollectionFlow() {
    let request = yield take(recommend_action_types.DEL_COLLECTION);
    const { id, likedID } = request;
    let response = yield call(delCollection, id, likedID);
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
