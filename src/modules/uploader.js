// User Status
const action_types = {
    // set filelist of uploader
    SET_FILELIST: 'filelist/SET',
}

const initialState = {
    fileList: [],
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_FILELIST:
            return {
                ...state,
                fileList: [
                    ...action.fileList
                ]
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    setFileList: (fileList) => ({
        type: action_types.SET_FILELIST, fileList
    }),
}

export default Reducer
export { action_types, actions }