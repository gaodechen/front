/**
 * @description sub reducer to deal with style transfer tools
 */
const action_types = {
    SET_AUDIO: 'audio/SET',         // set audio object uploaded or recorded
    SET_STYLE: 'style/SET',         // set the target style
}

const initialState = {
    audioSource: null,
    targetStyle: null,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_AUDIO:
            return {
                ...state,
                isFetching: true
            }
        case action_types.SET_SYTLE:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    setStyle: (payload) => ({
        type: action_types.SET_STYLE, payload
    }),
    setAudio: (payload) => ({
        type: action_types.SET_AUDIO, payload
    }),
}

export default Reducer
export { action_types, actions }