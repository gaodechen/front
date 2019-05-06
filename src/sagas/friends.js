import { put, take, call } from 'redux-saga/effects'
import { get, post, del } from '../api/request/request'

import { action_types as home_action_types, fetch_types } from '../modules/home'
import { action_types as friends_action_types } from '../modules/friends'
import status_code from '../api/request/status-code'

// 异步获取用户的[listName]字段数据
// listName = "following" || "followers"
export function* getList(listName, id) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/' + listName, id);
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* getFollowFlow() {
    while (true) {
        // 监听action，获取action参数
        let request = yield take(friends_action_types.GET_LIST);
        const { listName, id } = request;
        let response = yield call(getList, listName, id);
        if (response && response.status === status_code.SUCCESS) {
            // list获取成功
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            yield put({
                type: friends_action_types.SET_LIST,
                listName,
                data: response.data.data
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

// 向listName新增followID
export function* postFollow(listName, id, followID) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(post, '/api/' + listName, { id, followID });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* postFollowFlow() {
    // 监听action，获取action参数
    let request = yield take(friends_action_types.ADD_TO_LIST);
    const { listName, id, followID } = request;
    let response = yield call(postFollow, listName, id, followID);
    if (response && response.status === status_code.SUCCESS) {
        // list获取成功
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

// listName删除followID
export function* deleteFollow(listName, id, followID) {
    let response;
    try {
        response = yield call(del, '/api/' + listName, { id, followID });
    } catch (err) {
        response = err.response;
    } finally {
        return response;
    }
}

export function* deleteFollowFlow() {
    // 监听action，获取action参数
    let request = yield take(friends_action_types.DEL_FROM_LIST);
    const { listName, id, followID } = request;
    let response = yield call(deleteFollow, listName, id, followID);
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
