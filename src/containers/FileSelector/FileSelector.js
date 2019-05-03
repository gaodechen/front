import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { actions } from '../../modules/styleTransfer'
import { Selector } from '../Uploader'
// import Recorder from '../Recorder'

/**
 * @description guide users to upload or record audio files
 * @class FileSelector
 * @extends {Component}
 */
class FileSelector extends Component {
    render() {
        return (
            <div>
                <Selector setAudio={this.props.setAudio}>
                    <Button type='primary' shape='round' size='large' icon='upload'>
                        本地音频
                    </Button>
                </Selector>
                <Button shape='round' size='large' icon='notification'>
                    录制音频
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAudio: (audio) => {
            dispatch(actions.setAudio(audio))
        }
    }
}

export default connect(null, mapDispatchToProps)(FileSelector);