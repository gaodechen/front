/**
 * @description sub reducer to deal with transcription tool
 */
const action_types = {
    TRANSCRIPTION: 'music/TRANS',   // music transcription
    SET_MUSIC_XML: 'musicXml/SET',  // set music xml path
}

const initialState = {
    musicXml: null,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_MUSIC_XML:
            return {
                ...state,
                musicXml: action.xmlPath
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    transcript: (payload) => ({
        type: action_types.TRANSCRIPTION, payload
    }),
}

export default Reducer
export { action_types, actions }
