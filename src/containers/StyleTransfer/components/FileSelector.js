import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { withRouter } from 'react-router-dom'

import { actions } from '../../../modules/fileSelector'
import { Selector } from '../../Uploader'

/**
 * @description guide users to upload or record audio files
 * @class FileSelector
 * @extends {Component}
 */
class FileSelector extends Component {
    render() {
        return (
            <div style={{ height: '248px', paddingTop: '104px' }}>
                <Selector setAudio={this.props.setAudio}>
                    <Button type='primary' shape='round' size='large' icon='upload'>
                        本地音频
                    </Button>
                </Selector>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAudio: (audio, source = 'file') => {
            dispatch(actions.setAudio(audio, source))
        }
    }
}

export default withRouter(
    connect(null, mapDispatchToProps)(FileSelector)
);