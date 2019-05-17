import { put, take, call } from 'redux-saga/effects'
import { get, post } from '../api/request/agr-request'
import { action_types } from '../modules/transcription'
import { action_types as home_action_types, action_status } from '../modules/home'

/**
 * @description covert midiFile to musicXML
 * @param {FileReader} midiFile
 * @returns
 */
function* midi2xml(file) {
    let response;
    // start fetching and set fetching status
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(post, '/agr/midi2xmls', {file});
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
 * @description covert wav/mp3 to midi
 * @param {FileReader} midiFile
 * @returns
 */
function* transcript(payload) {
    let response;
    // start fetching and set fetching status
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(post, '/agr/wav2mids', payload);
    } catch (err) {
        // error response
        response = err.response;
    } finally {
        // update fetching status
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

function* download(file) {
    let response;
    yield put({ type: home_action_types.FETCH_START });
    try {
        response = yield call(get, '/agr/download', {name: 'xml/2019-05-15 18:05:08.217234.xml'})
    } catch(err) {
        response = err.response;
    } finally {
        yield put({ type: home_action_types.FETCH_END });
        return response;
    }
}

/**
 * @decription monitor transcription
 * @export
 */
export function* midi2xmlFlow() {
    while (true) {
        let request = yield take(action_types.MIDI_TO_XML);
        yield put({
            type: home_action_types.ACTION_UPDATE,
            actionStatus: action_status.PENDING,
        });
        const response = yield call(midi2xml, request.payload);
        if(response && response.data) {
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
            // set xmlUrl
            let xmlUrl = response.data;
            yield put({
                type: action_types.SET_MUSIC_XML,
                musicXml: xmlUrl,
            })
            // const file = yield call(download, xmlUrl.substring(xmlUrl));
        } else {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.REJECTED,
                msgContent: '转换失败，请重新尝试！',
            });
            // update action status
            yield put({
                type: home_action_types.ACTION_UPDATE,
                actionStatus: action_status.REJECTED,
            })
        }
    }
}

/**
 * @description transcription opt
 */
export function* transcriptionFlow() {
    while (true) {
        let request = yield take(action_types.WAV_TO_MIDI);
        yield put({
            type: home_action_types.ACTION_UPDATE,
            actionStatus: action_status.PENDING,
        });
        const response = yield call(transcript, request.payload);
        if(response && response.data) {
            // update message
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.RESOLVED,
                msgContent: '成功转换为MIDI！',
            });
            // update inferring status
            yield put({
                type: home_action_types.ACTION_UPDATE,
                actionStatus: action_status.RESOLVED,
            })
            // set xmlUrl
            let midiUrl = response.data;
            yield put({
                type: action_types.SET_MUSIC_MIDI,
                musicMidi: midiUrl,
            })
        } else {
            yield put({
                type: home_action_types.SET_MSG,
                msgType: action_status.REJECTED,
                msgContent: '转换失败，请重新尝试！',
            });
            // update action status
            yield put({
                type: home_action_types.ACTION_UPDATE,
                actionStatus: action_status.REJECTED,
            })
        }
    }
}
