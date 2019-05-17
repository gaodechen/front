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
    const urlPrefixLength = static_addr.STYLE_TRANSFER_MODEL.length;
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

function* saveModel(payload) {
    const { targetStyle } = payload;
    yield call(async_loadModelFromUrlAndSave, 'http://localhost:3002/static/model/styleTransfer/' + targetStyle + '/model.json', targetStyle)
}

function* process(args) {
    const { file, noteRange, isPiano: mild, transferAmplitude: control, targetStyle } = args;
    const payload = { file, minmain: noteRange[0], maxmain: noteRange[1], control, targetStyle };
    payload.mild = mild ? 'N' : 'Y';
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
            const response = yield call(process, request.payload);
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
    while (true) {
        let request = yield take(action_types.PROCESS);
        yield put({
            type: home_action_types.ACTION_UPDATE,
            actionStatus: action_status.PENDING,
        });
        try {
            yield call(saveModel, request.payload);
            console.log(request.payload);
            const response = yield call(process, { ...request.payload });
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
            yield put({
                type: action_types.SET_MIDI,
                midi: response.data,
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
