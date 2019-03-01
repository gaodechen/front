// 用户状态，异步操作状态
// userInfo用于登陆态
const action_types = {
    FETCH_START: 'fetch/START',         // 异步操作开始
    FETCH_END: 'fetch/END',             // 异步操作结束
    SET_MSG: 'fetch/SET',               // 设置异步操作返回值
    SET_USERINFO: 'userInfo/SET',       // 设置本地用户信息
    USER_AUTH: 'user/AUTH',             // 更新前端用户状态
    USER_LOGIN: 'user/LOGIN',
    USER_LOGOUT: 'user/LOGOUT',
    USER_REGISTER: 'user/REGISTER',
    GET_USERINFO: 'userinfo/GET',       // 获取id用户的基本信息
}

const fetch_types = {
    SUCCEED: true,
    FAILED: false
}

const initialState = {
    isFetching: false,
    msg: {
        type: undefined,
        content: ''
    },
    isLoggedIn: false,
    userInfo: {}
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.FETCH_START:
            return {
                ...state,
                isFetching: true
            }
        case action_types.FETCH_END:
            return {
                ...state,
                isFetching: false
            }
        case action_types.SET_MSG:
            return {
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent
                }
            }
        case action_types.SET_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    userLogin: (email, password, remember) => ({
        type: action_types.USER_LOGIN, email, password, remember
    }),
    userRegister: (email, username, password) => ({
        type: action_types.USER_REGISTER, email, username, password
    }),
    userLogout: () => ({
        type: action_types.USER_LOGOUT
    }),
    userAuth: () => ({
        type: action_types.USER_AUTH
    }),
    getUserInfo: (id) => ({
        type: action_types.GET_USERINFO, id
    }),
    clearMsg: () => ({
        type: action_types.SET_MSG, msg: initialState.msg
    })
}

export default Reducer
export { action_types, fetch_types, actions }