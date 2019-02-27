// 文章列表
const action_types = {
    // 获取music
    GET_MUSIC: 'music/GET',
}

const initialState = {
    // [musicID]: detail，异步获取音乐的详细信息
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_ARTCILE:
            return {
                ...state,
                // 单篇文章的详细信息
                [action.musicID]: {
                    ...action.music
                }
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    getMusic: (musicID) => ({
        type: action_types.GET_MUSIC, id: musicID
    }),
}

export default Reducer
export { action_types, actions }