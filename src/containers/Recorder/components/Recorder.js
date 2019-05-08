import React, { Component } from 'react'
import { Button, Row } from 'antd'
import { ReactMic } from 'react-mic'

import audioLogo from '../../../static/audio.svg'
import earphoneLogo from '../../../static/earphone.svg'

/**
 * @description Recorder component, recording save as Blob object
 * @class Recorder
 * @extends {Component}
 */
class Recorder extends Component {
    state = { finish: false }

    startRecording = () => {
        this.props.setRecording(true)
    }

    stopRecording = () => {
        this.props.setRecording(false)
    }

    onStart = () => {
        // console.log('You can tap into the onStart callback');
    }

    onStop = (blobObject) => {
        this.props.setBlobURL(blobObject.blobURL)
        this.props.callback(blobObject.blobURUL)
    }


    render() {
        const { isRecording } = this.props;

        if (this.props.isRecording) {
            return (
                <div>
                    <Row style={{ textAlign: 'center' }}>
                        <ReactMic
                            record={isRecording}
                            backgroundColor="#fafafa"
                            visualSetting="sinewave"
                            audioBitsPerSecond={128000}
                            onStop={this.onStop}
                            strokeColor="#000000"
                            mimeType="audio/wav"
                        />
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Button
                            shape="circle"
                            style={{ width: '100px', height: '100px' }}
                            onClick={this.stopRecording}
                        >
                            <img src={earphoneLogo} alt="Audio" width='50%' />
                        </Button>
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    点击按钮开始录制
                    <br />
                    <Button
                        shape="circle"
                        style={{ width: '100px', height: '100px', marginTop: '36px' }}
                        onClick={this.startRecording}
                    >
                        <img src={audioLogo} alt="Audio" width='50%' />
                    </Button>
                </div>
            );
        }
    }
}

export default Recorder