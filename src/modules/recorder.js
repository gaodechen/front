/**
 * @description Recorder component recording status and 
 */
const action_types = {
    SET_RECORDING: 'recording/SET',
    SET_BLOBURL: 'blobURL/SET',
}

const initialState = {
    // recoding status
    isRecording: false,
    // save as blob object after recording
    blobURL: '',
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_RECORDING:
            return {
                ...state,
                isRecording: action.isRecording
            }
        case action_types.SET_BLOBURL:
            return {
                ...state,
                blobURL: action.blobURL
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    // set blob object after recording
    setBlobURL: (blobURL) => ({
        type: action_types.SET_BLOBURL, blobURL
    }),
    // set recording status
    setRecording: (isRecording) => ({
        type: action_types.SET_RECORDING, isRecording
    })
}

export default Reducer
export { action_types, actions }