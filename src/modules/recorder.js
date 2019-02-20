// Recorder组件
const action_types = {
    SET_RECORDING: 'recording/SET',
    SET_BLOBURL: 'blobURL/SET',
}

const initialState = {
    isRecording: false,
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
    setBlobURL: (blobURL) => ({
        type: action_types.SET_BLOBURL, blobURL
    }),
    setRecording: (isRecording) => ({
        type: action_types.SET_RECORDING, isRecording
    })
}

export default Reducer
export { action_types, actions }