import { put, take, call } from 'redux-saga/effects'
import { action_types } from '../modules/emotionAnalysis'
import { action_types as home_action_types, fetch_types } from '../modules/home'
import { async_loadModelFromStorage, async_loadModelFromUrlAndSave, async_tensor2d, async_predict } from '../api/model/style-transfer/asyncTF'
import { static_addr } from '../config'

/**
 * @description async inference using TF.js in browser
 * @param {string} MODEL_URL
 * @param {string} style
 * @param {array} data
 * @returns
 */
function* infer(payload) {
    const { MODEL_URL, input } = payload;
    let output = [];
    const urlPrefixLength = static_addr.EMOTION_ANALYSIS_MODEL.length + 1; 
    const modelPath = MODEL_URL.substring(urlPrefixLength);

    let Model = yield call(async_loadModelFromUrlAndSave, MODEL_URL, modelPath)

    for (var i = 0; i < input.length; i++) {
        const subdata = input[i];
        const inputData = yield call(async_tensor2d, subdata, [1, 1500]);
        const outputTensor = yield call(async_predict, Model, inputData);
        const subOutput = outputTensor.array()
        output = output.concat(subOutput);
    }

    return output;
}

/**
 * @decription monitor inference action
 * @export
 */
export function* inferenceFlow() {
    while (true) {
        let request = yield take(action_types.INFER);
        yield put({
            type: home_action_types.FETCH_START
        })
        try {
            let output = yield call(infer, request.payload);
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.SUCCEED,
                msgContent: '文本情感分析完成！',
            });
            yield put({
                type: home_action_types.FETCH_END,
                msgType: fetch_types.SUCCEED,
            })
            yield put({
                type: action_types.SET_OUTPUT,
                output,
            })
        } catch (error) {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: fetch_types.FAILED,
                msgContent: '文本情感分析失败！',
            });
            yield put({
                type: home_action_types.FETCH_END,
                msgType: fetch_types.FAILED,
            })
        }
    }
}
