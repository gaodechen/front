import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import { static_addr } from '../../config'
import { Loading } from '../../components/Loading'
import Preprocess from '../../api/model/style-transfer/preprocess'

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
    if (audio) {
        reader.readAsBinaryString(audio)
    }
}

/**
 * @description inference using TF.js in browser
 * @param {string} MODEL_URL
 * @param {string} style
 * @param {array} data
 * @returns
 */
/*
const inference = (MODEL_URL, style, data) => {
    var output = []
    for (var i = 0; i < data.length; i++) {
        let subdata = data[i];
        tf.loadLayersModel(MODEL_URL)
            .then((Model) => {
                const inputData = tf.tensor3d(subdata, [1, 900, 1])
                return Model.predict(inputData)
            })
            .then((outputTensor) => {
                return outputTensor[3].array()
            })
            .then((subOutput) => {
                output = output.concat(subOutput);
                if (output.length === data.length) {
                    let jsonData = JSON.stringify({ 'Array': output, 'Original': data, 'Style': style });
                    console.log(jsonData);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
    return output;
} */

/**
 * @description using props.targetStyle & props.audio to generate music
 * @class MusicGenerator
 * @extends {Component}
 */
class MusicGenerator extends Component {
    componentDidMount() {
        const { audio, targetStyle } = this.props;
        if (!audio) {
            message.error('未选择文件')
        } else if (!targetStyle) {
            message.error('未选定风格')
        } else {
            ReadMidi(audio, (midiFile) => {
                const input = Preprocess(midiFile);
                console.log(input)
                const MODEL_URL = static_addr.STYLE_TRANSFER_MODEL + targetStyle;
                console.log(MODEL_URL)
                // const output = inference(MODEL_URL, targetStyle, input);
                // console.log(output)
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