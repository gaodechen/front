import { put, take, call } from 'redux-saga/effects'
import { get, post, del } from '../api/request/request'

import { action_types, fetch_types } from '../modules/home'
import status_code from '../api/request/status-code';

// 异步操作：登陆
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
                userInfo: response.data.data,
                isLoggedIn: true
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

// 异步操作：注册
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
            // 注册成功，设置相应信息
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
        } else {
            // 登陆失败，设置响应信息
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
    // yield put({ type: action_types.FETCH_START });
    try {
        response = yield call(del, '/api/session');
    } catch (err) {
        response = err.response;
    } finally {
        // yield put({ type: action_types.FETCH_END });
        return response;
    }
}

export function* logoutFlow() {
    while (true) {
        yield take(action_types.USER_LOGOUT);
        let response = yield call(logout);
        if (response && response.status === status_code.SUCCEED) {
            // 注销成功，设置相应信息
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            // 更新前端用户状态
            yield put({
                type: action_types.SET_USERINFO,
                userInfo: {},
                isLoggedIn: false
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

// 异步操作：拉取session
export function* auth() {
    let response;
    try {
        yield put({ type: action_types.FETCH_START });
        response = yield call(get, '/api/session');
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

export function* authFlow() {
    while (true) {
        yield take(action_types.USER_AUTH);
        let response = yield call(auth);
        // session拉取成功则用户处于登陆态
        let isLoggedIn = (response && response.status === status_code.SUCCEED);
        yield put({
            type: action_types.SET_USERINFO,
            userInfo: response.data.data,
            isLoggedIn
        });
    }
}