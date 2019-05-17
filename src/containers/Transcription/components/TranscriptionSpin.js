import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, message, Icon } from 'antd'

import { action_status } from "../../../modules/home";
import { actions } from '../../../modules/transcription'

class TranscriptionSpin extends Component {
    /**
     * @description read midi file from locale
     * @param {File} audio
     * @param {*} callback(result)
     */
    ReadMidi = (audio, callback) => {
        let reader = new FileReader();

        reader.onload = (event) => {
            callback(event.target.result);
        }
        if (audio) {
            reader.readAsDataURL(audio)
        }
    }

    /**
     * @description upload files and transcript
     */
    componentDidMount() {
        const { audio, source } = this.props;
        if (!audio) {
            message.error('文件无效！');
        } else {
            this.ReadMidi(audio, (file) => {
                this.props.process({file, source});
            });
        }
    }

    render() {
        const {actionStatus} = this.props;
        if (actionStatus === action_status.PENDING) {
            return (
                <div style={{height: '248px', paddingTop: '10%'}}>
                    <Spin size="large"/>
                </div>
            )
        }
        if (actionStatus === action_status.RESOLVED) {
            return (
                <div style={{height: '248px', paddingTop: '10%'}}>
                    <span><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize: '24px'}}/> 转换成功！</span>
                </div>
            )
        }
        return (
            <div style={{height: '248px', paddingTop: '10%'}}>
                <span><Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" style={{fontSize: '24px'}}/> 转换失败！</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        actionStatus: state.home.actionStatus,
        audio: state.fileSelector.audio,
        source: state.fileSelector.source,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        process: (payload) => {
            dispatch(actions.transcript(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranscriptionSpin);

