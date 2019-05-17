/**
 * @description sub reducer to deal with transcription tool
 */
const action_types = {
    WAV_TO_MIDI: 'music/TRANS',    // music transcription
    MIDI_TO_XML: 'midi/CONVERT',     // covert midi to xml
    SET_MUSIC_MIDI: 'musicMidi/SET', // set music midi path
    SET_MUSIC_XML: 'musicXml/SET',   // set music xml path
}

const initialState = {
    musicXml: null,
    musicMidi: null,
}

const Reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case action_types.SET_MUSIC_XML:
            return {
                ...state,
                musicXml: action.musicXml
            }
        case action_types.SET_MUSIC_MIDI:
            return {
                ...state,
                musicMidi: action.musicMidi
            }
        default:
            return state;
    }
}

// Action Creators
const actions = {
    transcript: (payload) => {
        return {
            type: action_types.WAV_TO_MIDI, payload
        }
    },
    midi2xml: (payload) => ({
        type: action_types.MIDI_TO_XML, payload
    }),
    setXml: (payload) => ({
        type: action_types.SET_MUSIC_XML, musicXml: payload
    }),
    setMidi: (payload) => ({
        type: action_types.SET_MUSIC_MIDI, musicMidi: payload
    })
}

export default Reducer
export { action_types, actions }
