import { put, take, call } from 'redux-saga/effects'
import { post, del } from '../api/request'

import { action_types, fetch_types } from '../modules/home'
import status_code from '../api/status-code';

export function* login(email, password) {
    let response;
    // 请求开始
    yield put({ type: action_types.FETCH_START });
    try {
        response = yield call(post, '/api/session', { email, password });
    } catch (err) {
        // 收集错误信息
        response = err.response;
    } finally {
        // 请求结束，返回响应信息
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

export function* loginFlow() {
    while (true) {
        let request = yield take(action_types.USER_LOGIN);
        let response = yield call(login, request.email, request.password);
        if (response && response.status === status_code.SUCCEED) {
            // 登陆成功，设置用户信息
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            yield put({
                type: action_types.SET_USERINFO,
                userInfo: response.data.data
            });
        } else {
            // 请求出错
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}

export function* register(email, username, password) {
    let response;
    yield put({ type: action_types.FETCH_START });
    try {
        response = yield call(post, '/api/user', { email, username, password });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

export function* registerFlow() {
    while (true) {
        let request = yield take(action_types.USER_REGISTER);
        let { email, username, password } = request;
        let response = yield call(register, email, username, password);
        if (response && response.status === status_code.SUCCEED) {
            // 注册成功，设置用户信息
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            yield put({
                type: action_types.SET_USERINFO,
                userInfo: response.data
            });
        } else {
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}

export function* logout() {
    let response;
    yield put({ type: action_types.FETCH_START });
    try {
        response = yield call(del, '/api/session');
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

export function* logoutFlow() {
    while (true) {
        yield take(action_types.USER_LOGOUT);
        let response = yield call(logout);
        if (response && response.status === status_code.SUCCEED) {
            // 注销成功
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            yield put({
                type: action_types.SET_USERINFO,
                userInfo: {}
            });
        } else {
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}