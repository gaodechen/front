import { put, take, call } from 'redux-saga/effects'
import { get, post, del, put as upd } from '../api/request/request'
import { action_types } from '../modules/styleTransfer'
import { action_types as home_action_types, action_status } from '../modules/home'
import { async_loadModelFromStorage, async_loadModelFromUrlAndSave, async_tensor3d, async_predict } from '../api/model/asyncTF'
import { static_addr } from '../config'

/**
 * @description async inference using TF.js in browser
 * @param {string} MODEL_URL
 * @param {string} style
 * @param {array} data
 * @returns
 */
function* infer(payload) {
    const { MODEL_URL, input, targetStyle } = payload;
    let output = [];
    const urlPrefixLength = static_addr.STYLE_TRANSFER_MODEL.length + 1;
    const modelPath = MODEL_URL.substring(urlPrefixLength);

    let Model = yield call(async_loadModelFromUrlAndSave, MODEL_URL, modelPath)

    for (var i = 0; i < input.length; i++) {
        const subdata = input[i];
        const inputData = yield call(async_tensor3d, subdata, [1, 900, 1]);
        const outputTensor = yield call(async_predict, Model, inputData);
        const subOutput = outputTensor[3].array()
        output = output.concat(subOutput);
    }

    let jsonData = JSON.stringify({ 'Array': output, 'Original': input, 'Style': targetStyle });
    return jsonData;
}

function* process(args) {
    const { filename, noteRange, isPiano: mild, transferAmplitude: control } = args;
    const payload = {filename, minmain: noteRange[0], maxmain: noteRange[1], control};
    payload.mild = mild ? 'Y' : 'N';
    let response;
    // start fetching and set fetching status
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(post, '/agr/processions', { ...payload });
    } catch (err) {
        // error response
        response = err.response;
    } finally {
        // update fetching status
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
    return ;
}

export function* upload(file) {
    let response;
    try {
        response = yield call(post, '/agr/upload', {file});
    } catch (error) {
        response = error.response;
    } finally {
        return response;
    }
}

/**
 * @decription monitor inference action
 * @export
 */
export function* inferenceFlow() {
    while (true) {
        let request = yield take(action_types.INFER);
        yield put({
            type: home_action_types.ACTION_UPDATE,
            actionStatus: action_status.PENDING,
        });
        try {
            // output of model
            const outputJson = yield call(infer, request.payload);
            // update message
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.RESOLVED,
                msgContent: '成功谱曲！',
            });
            // update inferring status
            yield put({
                type: home_action_types.ACTION_UPDATE,
                actionStatus: action_status.RESOLVED,
            })
            const outputUrl = yield call(process, request.payload);
        } catch (error) {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.REJECTED,
                msgContent: '转换失败，请重新尝试！',
            });
            // update inferring status
            yield put({
                type: home_action_types.ACTION_UPDATE,
                actionStatus: action_status.REJECTED,
            })
        }
    }
}

/**
 * @description processFlow
 */
export function* processFlow() {
    while(true) {
        let request = yield take(action_types.PROCESS);
        yield put({
            type: home_action_types.ACTION_UPDATE,
            actionStatus: action_status.PENDING,
        });
        try {
            // upload files
            console.log(request.payload)
            const filepath = yield call(upload, request.payload.input);
            const outputUrl = yield call(process, {...request.payload, filepath});
            // update message
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.RESOLVED,
                msgContent: '成功谱曲！',
            });
            // update inferring status
            yield put({
                type: home_action_types.ACTION_UPDATE,
                actionStatus: action_status.RESOLVED,
            })
        } catch (error) {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.REJECTED,
                msgContent: '转换失败，请重新尝试！',
            });
            // update inferring status
            yield put({
                type: home_action_types.ACTION_UPDATE,
                actionStatus: action_status.REJECTED,
            })
        }
    }
}
