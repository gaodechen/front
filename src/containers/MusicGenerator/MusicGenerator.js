import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import { addr_config } from '../../config'
import { Loading } from '../../components/Loading'
import Preprocess from '../../api/model/style-transfer/preprocess'
import inference from '../../api/model/style-transfer/inference'

const MODEL_PREFIX = addr_config.STATIC_HOST + '/model/styleTransfer/';

/**
 * @description read midi file from locale
 * @param {File} audio
 * @param {*} callback(result)
 */
const ReadMidi = (audio, callback) => {
        let reader = new FileReader();

        reader.onload = (event) => {
            callback(event.target.result);
        }
        if(audio) {
            reader.readAsBinaryString(audio)
        }
}

/**
 * @description using props.targetStyle & props.audio to generate music
 * @class MusicGenerator
 * @extends {Component}
 */
class MusicGenerator extends Component {
    componentDidMount() {
        const { audio, targetStyle } = this.props;
        if(!audio) {
            message.error('未选择文件')
        } else if(!targetStyle) {
            message.error('未选定风格')
        } else {
            ReadMidi(audio, (midiFile) => {
                const input = Preprocess(midiFile);
                const MODEL_URL = MODEL_PREFIX + targetStyle;
                console.log(MODEL_URL)
                const output = inference(MODEL_URL, targetStyle, input);
                console.log(output)
            });
        }
    }

    render() {
        return (
            <div>
                {this.props.loading && <Loading />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        targetStyle: state.styleTransfer.targetStyle,
        audio: state.styleTransfer.audio,
        loading: state.styleTransfer.loading,
    }
}

export default connect(mapStateToProps)(MusicGenerator)