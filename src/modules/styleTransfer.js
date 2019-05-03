/**
 * @description sub reducer to deal with style transfer tools
 */
const action_types = {
    SET_AUDIO: 'audio/SET',         // set audio object uploaded or recorded
    SET_STYLE: 'style/SET',         // set the target style
    SET_LOADING: 'loading/SET',     // update loading status
}

const initialState = {
    audio: null,
    targetStyle: null,
    loading: false,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_AUDIO:
            return {
                ...state,
                audio: action.audio,
            }
        case action_types.SET_STYLE:
            return {
                ...state,
                targetStyle: action.targetStyle,
            }
        case action_types.SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    setTargetStyle: (targetStyle) => ({
        type: action_types.SET_STYLE, targetStyle
    }),
    setAudio: (audio) => ({
        type: action_types.SET_AUDIO, audio
    }),
    setLoading: (loading) => ({
        type: action_types.SET_LOADING, loading
    })
}

export default Reducer
export { action_types, actions }