// 表单Modal状态
const action_types = {
    SHOW_FORM: 'form/SHOW',
    HIDE_FORM: 'form/HIDE'
}

const initialState = {
    visible: { loginForm: false, registerForm: false }
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SHOW_FORM:
            return {
                ...state,
                visible: {
                    ...state.visible,
                    // [action.form字符串]表示操作对象
                    [action.form]: true
                }
            }
        case action_types.HIDE_FORM:
            return {
                ...state,
                visible: {
                    ...state.visble,
                    [action.form]: false
                }
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    showForm: (form) => ({
        type: action_types.SHOW_FORM, form
    }),
    hideForm: (form) => ({
        type: action_types.HIDE_FORM, form
    })
}

export default Reducer
export { action_types, actions }