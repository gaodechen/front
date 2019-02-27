// 推送
const action_types = {
    // 获取推荐列表
    GET_RECOMMEND: 'rec/GET',
    // 将推荐列表存放到store
    SET_RECOMMEND: 'rec/SET',
    // 音乐收藏
    ADD_COLLECTION: 'collection/ADD',
    DEL_COLLECTION: 'collection/DEL',
    GET_COLLECTIONS: 'collection/GET',
}

const rec_types = {
    USER: 'user',
    MUSIC: 'music',
}

// 异步获取的推送列表
const initialState = {
    recList: [],
    collections: [],
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_RECOMMEND:
            return {
                ...state,
                recList: {
                    ...action.recs,
                }
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    // 获取recType类型的推送，数量为recNum
    getRecommend: (id, recType = rec_types.MUSIC, recNum = 6) => ({
        type: action_types.GET_RECOMMEND, id, recType, recNum
    }),
    // 设置store当中的recList
    setRecommend: (recList) => ({
        type: action_types.SET_RECOMMEND, recList
    }),
    addLike: (userID, musicID) => ({
        type: action_types.ADD_COLLECTION, userID, musicID
    }),
    getLikes: () => ({
        type: action_types.GET_COLLECTIONS
    })
}

export default Reducer
export { action_types, actions }