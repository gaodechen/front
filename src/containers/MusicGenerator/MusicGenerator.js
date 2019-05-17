import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Spin, Icon, message, Card, Row, Col } from 'antd'

// import { static_addr } from '../../config'
import { actions as styleTransfer_actions } from '../../modules/styleTransfer'
import { action_status } from '../../modules/home'
// import Preprocess from '../../api/model/style-transfer/preprocess'

/**
 * @description using props.targetStyle & props.audio to generate music
 *              get props from store and dispatch async actions through sagas
 *              async actions would call TF.js inference
 * @class MusicGenerator
 * @extends {Component}
 */
class MusicGenerator extends Component {
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
            reader.readAsDataURL(audio);
        }
    }

    /**
     * @description call model inferring or show error messages
     * @memberof MusicGenerator
     */
    componentDidMount() {
        const { audio, targetStyle } = this.props;
        if (!audio) {
            message.error('无效音频！')
        } else if (!targetStyle) {
            message.error('未选定风格')
        } else {
            this.ReadMidi(audio, (midiFile) => {
                // const input = Preprocess(midiFile);
                const input = midiFile;
                // const MODEL_URL = static_addr.STYLE_TRANSFER_MODEL + '/' + targetStyle + '/model.json';
                const { noteRange, transferAmplitude, isPiano } = this.props;
                // this.props.infer({ MODEL_URL, targetStyle, input, noteRange, transferAmplitude, isPiano})
                this.props.process({ file: input, targetStyle, noteRange, transferAmplitude, isPiano })
            });
        }
    }

    transcript = () => {
        this.props.history.push('/styleTransfer/sheetMusic');
    }

    createPage = () => {
        this.props.history.push('/editor');
    }

    render() {
        const { actionStatus } = this.props;
        if (actionStatus === action_status.PENDING) {
            return (
                <div style={{ height: '248px', paddingTop: '10%' }}>
                    <Spin size="large" />
                </div>
            )
        }
        if (actionStatus === action_status.RESOLVED) {
            return (
                <div style={{ height: '248px', paddingTop: '3%' }}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card hoverable bordered title={<Icon type="download" />}>
                                <a href={this.props.midiPath}>下载MIDI</a>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card onClick={this.createPage} hoverable title={<Icon type="edit" />}>
                                生成乐曲页面
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
        return (
            <div style={{ height: '248px', paddingTop: '10%' }}>
                <span><Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" style={{ fontSize: '24px' }} /> 模型调用失败！</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        targetStyle: state.styleTransfer.targetStyle,
        audio: state.fileSelector.audio,
        actionStatus: state.home.actionStatus,
        transferAmplitude: state.styleTransfer.transferAmplitude,
        noteRange: state.styleTransfer.noteRange,
        isPiano: state.styleTransfer.isPiano,
        midiPath: state.styleTransfer.midi,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        infer: (payload) => {
            dispatch(styleTransfer_actions.infer(payload))
        },
        process: (payload) => {
            dispatch(styleTransfer_actions.process(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MusicGenerator))