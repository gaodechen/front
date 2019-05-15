import React, { Component } from 'react'
import { Button, Row } from 'antd'
import { ReactMic } from 'react-mic'
import { message } from 'antd'

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
    }

    onData = (data) => {
    }

    onStop = (blobObject) => {
        message.success('录音成功！');
        this.props.setBlobURL(blobObject.blobURL)
        this.props.callback(blobObject.blob)
    }


    render() {
        const { isRecording } = this.props;

        return (
            <div>
                <Row style={{ textAlign: 'center' }}>
                    <ReactMic
                        record={isRecording}
                        backgroundColor="#fafafa"
                        visualSetting="sinewave"
                        audioBitsPerSecond={128000}
                        onStart={this.onStart}
                        onData={this.onData}
                        onStop={this.onStop}
                        strokeColor="#000000"
                        mimeType="audio/wav"
                    />
                </Row>
                {
                    isRecording
                        ?
                        <Button
                            shape="circle"
                            style={{ width: '100px', height: '100px' }}
                            onClick={this.stopRecording}
                        >
                            <img src={earphoneLogo} alt="Audio" width='50%' />
                        </Button>
                        :
                        <Button
                            shape="circle"
                            style={{ width: '100px', height: '100px' }}
                            onClick={this.startRecording}
                        >
                            <img src={audioLogo} alt="Audio" width='50%' />
                        </Button>
                }
            </div>
        )
    }
}

export default Recorder