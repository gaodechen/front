/**
 * Reducer to deal with recommendations & collections
 */
const action_types = {
    GET_RECOMMEND: 'rec/GET',
    SET_RECOMMEND: 'rec/SET',
    ADD_COLLECTION: 'collection/ADD',
    DEL_COLLECTION: 'collection/DEL',
    GET_COLLECTIONS: 'collection/GET',
}

const rec_types = {
    USER: 'user',
    MUSIC: 'music',
    ARTICLE: 'article',
}

const initialState = {
    // recommendation list of recType
    recList: [],
    // collection list
    collectionList: [],
    // similar users list
    similarUserList: [],
}

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
    getPosters: (payload) => ({
        type: action_types.GET_POSTERS, payload
    }),
    // fetch recommendations
    getRecommend: (_id, payload) => ({
        type: action_types.GET_RECOMMEND, _id, payload
    }),
    // store reommendation list
    setRecommend: (payload) => ({
        type: action_types.SET_RECOMMEND, payload
    }),
    // update recommender info for real-time recommendations
    onLike: (payload) => ({
        type: action_types.ADD_COLLECTION, payload
    }),
    // undo "like"
    onUnLike: (payload) => ({
        type: action_types.DEL_COLLECTION, payload
    }),
}

export default Reducer
export { action_types, actions, rec_types }