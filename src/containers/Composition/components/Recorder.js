import React, { Component } from 'react'
import { Button, Icon, Row, Col } from 'antd'
import { ReactMic } from 'react-mic'

class Recorder extends Component {
    startRecording = () => {
        this.props.setRecording(true)
    }

    stopRecording = () => {
        this.props.setRecording(false)
    }

    onSave = (blobObject) => {
    }

    onStart = () => {
        console.log('You can tap into the onStart callback');
    }

    onStop = (blobObject) => {
        this.props.setBlobURL(blobObject.blobURL)
    }


    render() {
        const { isRecording } = this.props;

        return (
            <div>
                <ReactMic
                    record={isRecording}
                    backgroundColor="#FFF"
                    visualSetting="sinewave"
                    audioBitsPerSecond={128000}
                    onStop={this.onStop}
                    strokeColor="#000000"
                    mimeType="audio/wav"
                />
                <div>
                    <audio
                        controls="controls"
                        src={this.props.blobURL}
                    >
                        浏览器不支持HTML 5 audio
                    </audio>
                </div>
                <Button
                    shape="circle"
                    style={{ width: '70px', height: '70px' }}
                    disabled={isRecording}
                    onClick={this.startRecording}
                >
                    <Icon type="right" />
                </Button>
                <Button
                    shape="circle"
                    style={{ width: '70px', height: '70px' }}
                    disabled={!isRecording}
                    onClick={this.stopRecording}
                >
                    <Icon type="pause" />
                </Button>
            </div>
        );
    }
}

export default Recorder