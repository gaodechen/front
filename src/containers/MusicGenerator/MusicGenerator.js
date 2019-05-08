import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, message } from 'antd'

import { ContentLayout } from '../../components/Layouts'
import SheetMusic from '../SheetMusic'
import { static_addr } from '../../config'
import { actions as styleTransfer_actions } from '../../modules/styleTransfer'
import { fetch_types } from '../../modules/home'
import Preprocess from '../../api/model/style-transfer/preprocess'

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
            reader.readAsBinaryString(audio)
        }
    }
    /**
     * @description call model inferring or show error messages
     * @memberof MusicGenerator
     */
    componentDidMount() {
        const { audio, targetStyle } = this.props;
        if (!audio) {
            message.error('未选择文件')
        } else if (!targetStyle) {
            message.error('未选定风格')
        } else {
            this.ReadMidi(audio, (midiFile) => {
                const input = Preprocess(midiFile);
                const MODEL_URL = static_addr.STYLE_TRANSFER_MODEL + '/' + targetStyle + '/model.json';
                this.props.infer({ MODEL_URL, targetStyle, input })
            });
        }
    }

    render() {
        const { isFetching } = this.props;
        if (isFetching === fetch_types.UNDONE) {
            return (
                <div style={{marginTop: '150px'}}>
                    <Spin size="large" />
                </div>
            )
        } else if (isFetching === fetch_types.SUCCEES) {
            return (
                <ContentLayout sider={false} app={true}>
                    <span>转换成功！</span>
                </ContentLayout>
            )
        } else if (isFetching === fetch_types.FAILED) {
            return (
                <ContentLayout sider={false} app={true}>
                    <span>无法正确加载模型，转换失败！</span>
                </ContentLayout>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        targetStyle: state.styleTransfer.targetStyle,
        audio: state.fileSelector.audio,
        isFetching: state.home.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        infer: (payload) => {
            dispatch(styleTransfer_actions.infer(payload))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicGenerator)