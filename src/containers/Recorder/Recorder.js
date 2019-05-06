import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Recorder } from './components'
import { actions as recorder_actions } from '../../modules/recorder'
import { actions as fileSelector_actions } from '../../modules/fileSelector'

class WrappedRecorder extends Component {
    render() {
        const { isRecording, blobURL, setBlobURL, setRecording, callback } = this.props;

        return (
            <Recorder
                isRecording={isRecording}
                blobURL={blobURL}
                setBlobURL={setBlobURL}
                setRecording={setRecording}
                callback={callback}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isRecording: state.recorder.isRecording,
        blobURL: state.recorder.blobURL,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBlobURL: (blobURL) => {
            dispatch(recorder_actions.setBlobURL(blobURL))
        },
        setRecording: (isRecording) => {
            dispatch(recorder_actions.setRecording(isRecording))
        },
        callback: (blobObject) => {
            dispatch(fileSelector_actions.setAudio(blobObject))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRecorder)