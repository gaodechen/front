import { put, take, call } from 'redux-saga/effects'
import { get, post, del } from '../api/request'

import { action_types as home_action_types, fetch_types } from '../modules/home'
import { action_types as friends_action_types } from '../modules/friends'
import status_code from '../api/status-code'

// 异步获取用户的[listName]字段数据
// listName = "following" || "followers"
export function* getList(listName, id) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/api/' + listName, id);
    } catch(err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

export function* getListFlow() {
    while(true) {
        // 监听action，获取action参数
        let request = yield take(friends_action_types.GET_LIST);
        const {listName, id} = request;
        let response = yield call(getList, listName, id);
        if(response && response.status === status_code.SUCCEED) {
            // list获取成功
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            yield put({
                type: friends_action_types.SET_LIST,
                [listName]: response.data.data,
            });
            yield console.log(response.data.data)
        } else {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}