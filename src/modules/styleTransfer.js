/**
 * @description sub reducer to deal with style transfer tools
 */
const action_types = {
    SET_STYLE: 'style/SET',         // set the target style
    INFER: 'model/INFER',           // start inferring in browser
    PROCESS: 'model/PROCESS',       // whole process on server
    SET_ARGS: 'args/SET',           // set transfer arguments
    SET_MIDI: 'transferMidi/SET',   // set the result of transfer
}

const initialState = {
    targetStyle: null,
    transferAmplitude: 1,
    noteRange: [36, 84],
    isPiano: true,
    midi: null,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_STYLE:
            return {
                ...state,
                targetStyle: action.targetStyle,
            }
        case action_types.SET_ARGS:
            return {
                ...state,
                ...action.payload,
            }
        case action_types.SET_MIDI:
            return {
                ...state,
                midi: action.midi,
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    /**
     * @description set target style of transferring
     * @param {*} targetStyle
     */
    setTargetStyle: (targetStyle) => ({
        type: action_types.SET_STYLE, targetStyle
    }),
    /**
     * @description model inferring action
     * @param {*} payload
     */
    infer: (payload) => ({
        type: action_types.INFER, payload
    }),
    process: (payload) => ({
        type: action_types.PROCESS, payload
    }),
    setTransferArgs: (payload) => ({
        type: action_types.SET_ARGS, payload
    }),
}

export default Reducer
export { action_types, actions }