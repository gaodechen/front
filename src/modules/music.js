const action_types = {
    GET_MUSIC: 'music/GET',
    POST_MUSIC: 'music/POST',
    DEL_MUSIC: 'music/DEL',
    UPD_MUSIC: 'music/UPD',
}

const initialState = {
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_MUSIC:
            return {
                ...state,
                // music information
                [action.musicId]: {
                    ...action.music
                }
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    getMusic: (_id) => ({
        type: action_types.GET_MUSIC, _id
    }),
    postMusic: (payload) => ({
        type: action_types.POST_MUSIC, payload
    }),
    deleteMusic: (_id) => ({
        type: action_types.DEL_MUSIC, _id
    }),
    updateMusic: (_id, payload) => ({
        type: action_types.UPD_MUSIC, _id, payload
    })
}

export default Reducer
export { action_types, actions }