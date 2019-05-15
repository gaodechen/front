/**
 * @description sub reducer maintaining user status & async opt status
 */
const action_types = {
    FETCH_START: 'fetch/START',         // start fetching
    FETCH_END: 'fetch/END',             // end fetching
    SET_MSG: 'msg/SET',                 // set message to display
    SET_USERINFO: 'userInfo/SET',       // set userinfo
    GET_USERINFO: 'userInfo/GET',       // get userinfo
    USER_AUTH: 'user/AUTH',             // update user status
    USER_LOGIN: 'user/LOGIN',           // login action
    USER_LOGOUT: 'user/LOGOUT',         // logout action
    USER_REGISTER: 'user/REGISTER',     // register action
    USER_UPDATE: 'user/UPDATE',         // update userinfo
    ACTION_UPDATE: 'action/UPDATE',     // resolve or reject action
};

// is fetching successful
const fetch_types = {
    SUCCEED: 'succeed',
    FAILED: 'failed',
};

// life cycle of actions
const action_status = {
    PENDING: 'pending',
    RESOLVED: 'succeed',
    REJECTED: 'failed',
};

const initialState = {
    isFetching: false,
    actionStatus: action_status.PENDING,
    msg: {
        type: undefined,
        content: ''
    },
    isLoggedIn: false,
    userInfo: {}
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.FETCH_START:
            return {
                ...state,
                isFetching: true
            };
        case action_types.FETCH_END:
            return {
                ...state,
                isFetching: false
            };
        case action_types.SET_MSG:
            return {
                ...state,
                isFetching: false,
                msg: {
                    type: action.msgType,
                    content: action.msgContent
                }
            };
        case action_types.SET_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo,
                isLoggedIn: action.isLoggedIn
            };
        case action_types.ACTION_UPDATE:
            return {
                ...state,
                actionStatus: action.actionStatus,
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    userLogin: (payload) => ({
        type: action_types.USER_LOGIN, payload
    }),
    userRegister: (payload) => ({
        type: action_types.USER_REGISTER, payload
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
    updateUserInfo: (payload) => ({
        type: action_types.USER_UPDATE, payload
    }),
    clearMsg: () => ({
        type: action_types.SET_MSG, msg: initialState.msg
    })
}

export default Reducer
export { action_types, fetch_types, actions, action_status }