import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, message } from 'antd'

import { actions } from '../../../modules/transcription'

class TranscriptionSpin extends Component {
    componentDidMount() {
        if (!this.props.audio) {
            message.success('文件无效！');
        } else {
        }
    }

    render() {
        return (
            <div style={{height: '248px', paddingTop: '96px'}}>
                {
                    this.props.xmlAvailable
                        ?
                        <span>生成完毕</span>
                        :
                        <Spin size={"large"} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        audio: state.fileSelector.audio,
        xmlPath: state.transcription.musicXml,
        xmlAvailable: !!state.transcription.musicXml,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        process: (payload) => {
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranscriptionSpin);

