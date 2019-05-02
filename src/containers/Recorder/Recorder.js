import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Recorder } from './components'
import { actions } from '../../modules/recorder'

class WrappedRecorder extends Component {
    render() {
        const { isRecording, blobURL, setBlobURL, setRecording } = this.props;

        return (
            <Recorder
                isRecording={isRecording}
                blobURL={blobURL}
                setBlobURL={setBlobURL}
                setRecording={setRecording}
            >
                {
                    React.Children.map(this.props.children, (child, i) => {
                        return child
                    })
                }
            </Recorder>
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
            dispatch(actions.setBlobURL(blobURL))
        },
        setRecording: (isRecording) => {
            dispatch(actions.setRecording(isRecording))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRecorder)