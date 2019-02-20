// Friends Panel Status
const action_types = {
    GET_LIST: 'list/GET',
    SET_LIST: 'list/SET',
    ADD_TO_LIST: 'list/ADD',
    DEL_FROM_LIST: 'list/DEL',
}

const initialState = {
    following: [],
    followers: []
}

// Reducer
const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_LIST:
            return {
                ...state,
                [action.listName]: {
                    ...state[action.listName],
                    [action.listName]: action.data
                }
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    getList: (listName, id) => ({
        type: action_types.GET_LIST, listName, id
    }),
    addToList: (listName, id, item) => ({
        type: action_types.ADD_TO_LIST, listName, id, item
    }),
    deleteFromList: (listName, id, item) => ({
        type: action_types.DEL_FROM_LIST, listName, id, item
    })
}

export default Reducer
export { action_types, actions }