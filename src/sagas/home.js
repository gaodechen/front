import { put, take, call } from 'redux-saga/effects'
import { get, post, del, put as upd } from '../api/request/request'

import { action_types, fetch_types } from '../modules/home'
import status_code from '../api/request/status-code';

/**
 * @description async login saga
 * @param {*} payload
 * @returns
 */
function* login(payload) {
    let response;
    // start fetching and set fetching status
    yield put({ type: action_types.FETCH_START });
    try {
        response = yield call(post, '/api/session', { ...payload });
    } catch (err) {
        // error response
        response = err.response;
    } finally {
        // update fetching status
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

/**
 * @decription monitor login action
 * @export
 */
export function* loginFlow() {
    while (true) {
        let request = yield take(action_types.USER_LOGIN);
        let response = yield call(login, request.payload);
        if (response && response.status === status_code.SUCCESS) {
            // update fetching message
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            // update userinfo when logging in successfully
            yield put({
                type: action_types.SET_USERINFO,
                userInfo: response.data.data,
                isLoggedIn: true
            });
        } else {
            // set error message
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}

/**
 * @description async register sag
 * @param {*} payload
 * @returns
 */
function* register(payload) {
    let response;
    yield put({ type: action_types.FETCH_START });
    try {
        response = yield call(post, '/api/user', { ...payload });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

/**
 * @description monitor register action
 * @export
 */
export function* registerFlow() {
    while (true) {
        let request = yield take(action_types.USER_REGISTER);
        let response = yield call(register, request.payload);
        if (response && response.status === status_code.SUCCESS) {
            // set userinfo when registering successfully
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
        } else {
            // set message when error happens
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}

/**
 * @description async logout saga
 * @returns
 */
function* logout() {
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

/**
 * @description monitor loggout action
 * @export
 */
export function* logoutFlow() {
    while (true) {
        yield take(action_types.USER_LOGOUT);
        let response = yield call(logout);
        if (response && response.status === status_code.SUCCESS) {
            // logout successfully
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            // update user status on front end
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

/**
 * @description async get user seesion
 * @returns
 */
function* auth() {
    let response;
    try {
        // start fetching
        yield put({ type: action_types.FETCH_START });
        response = yield call(get, '/api/session');
    } catch (err) {
        // set error resposne
        response = err.response;
    } finally {
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

/**
 * @description monitor auth action
 * @export
 */
export function* authFlow() {
    while (true) {
        yield take(action_types.USER_AUTH);
        let response = yield call(auth);
        // if auth verified, user has logged in
        let isLoggedIn = (response && response.status === status_code.SUCCESS);
        // update userinfo in store
        yield put({
            type: action_types.SET_USERINFO,
            userInfo: response.data.data,
            isLoggedIn
        });
    }
}

/**
 * @description monitor get userinfo action
 * @export
 */
export function* getUserInfoFlow() {
    while (true) {
        yield take(action_types.GET_USERINFO);
        let response = yield call(auth);
        // if auth verified, user has logged in
        let isLoggedIn = (response && response.status === status_code.SUCCESS);
        // update userinfo in store
        yield put({
            type: action_types.SET_USERINFO,
            userInfo: response.data.data,
            isLoggedIn
        });
    }
}

/**
 * @description update userInfo
 * @param {*} payload
 * @returns
 */
function* update(payload) {
    let response;
    yield put({ type: action_types.FETCH_START });
    try {
        response = yield call(upd, '/api/user', { ...payload });
    } catch (err) {
        response = err.response;
    } finally {
        yield put({ type: action_types.FETCH_END });
        return response;
    }
}

/**
 * @description monitor update action
 * @export
 */
export function* updateFlow() {
    while (true) {
        let request = yield take(action_types.USER_UPDATE);
        let response = yield call(update, request.payload);
        if (response && response.status === status_code.SUCCESS) {
            // update fetching message
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: response.data.message
            });
            // update userinfo when logging in successfully
            yield put({
                type: action_types.SET_USERINFO,
                userInfo: response.data.data,
                isLoggedIn: true
            });
        } else {
            // set error message
            yield put({
                type: action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: response.data.message
            });
        }
    }
}