// 表单Modal状态
const action_types = {
    SHOW_MODAL: 'modal/SHOW',
    HIDE_MODAL: 'modal/HIDE'
}

const initialState = {
    visible: { FormA: true }
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SHOW_MODAL:
            return {
                ...state,
                visible: {
                    ...state.visible,
                    // [action.modal字符串]表示操作对象
                    [action.modal]: true
                }
            }
        case action_types.HIDE_MODAL:
            return {
                ...state,
                visible: {
                    ...state.visble,
                    [action.modal]: false
                }
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    showForm: (modal) => ({
        type: action_types.SHOW_MODAL, modal
    }),
    hideForm: (modal) => ({
        type: action_types.HIDE_MODAL, modal
    })
}

export default Reducer
export { action_types, actions }