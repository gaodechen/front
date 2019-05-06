/**
 * @description sub reducer to deal with style transfer tools
 */
const action_types = {
    SET_STYLE: 'style/SET',         // set the target style
    INFER: 'model/INFER',           // start inferring in browser
}

const initialState = {
    targetStyle: null,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_STYLE:
            return {
                ...state,
                targetStyle: action.targetStyle,
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
    })
}

export default Reducer
export { action_types, actions }