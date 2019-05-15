import { put, take, call } from 'redux-saga/effects'
import { get, post, del, put as upd } from '../api/request/request'
import { action_types } from '../modules/transcription'
import { action_types as home_action_types, action_status } from '../modules/home'
import { static_addr } from '../config'

/**
 * @description covert midiFile to musicXML
 * @param {FileReader} midiFile
 * @returns
 */
function* process(midiFile) {
    let response;
    // start fetching and set fetching status
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(post, '/agr/midi2xmls', {file: midiFile});
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

/**
 * @decription monitor transcription
 * @export
 */
export function* transcriptionFlow() {
    while (true) {
        let request = yield take(action_types.TRANSCRIPTION);
        yield put({
            type: home_action_types.ACTION_UPDATE,
            actionStatus: action_status.PENDING,
        });
        console.log(request)
        try {
            // output of model
            // update message
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.RESOLVED,
                msgContent: '成功转换为谱面！',
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
