/**
 * @description sub reducer to deal with style transfer tools
 */
const action_types = {
    SET_OUTPUT: 'style/SET',         // set output of model
    INFER: 'model/INFER',            // start inferring in browser
}

const initialState = {
    output: null,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_OUTPUT:
            return {
                ...state,
                output: action.output,
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    /**
     * @description set target style of transferring
     * @param {*} output
     */
    setOutput: (output) => ({
        type: action_types.SET_OUTPUT, output
    }),
    /**
     * @description model inferring action
     * @param {*} payload
     */
    infer: (payload) => ({
        type: action_types.INFER, payload
    })
}

export default Reducer
export { action_types, actions }