import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

// import { ContentLayout } from '../../components/Layouts'
import Uploader from '../Uploader'
import Recorder from '../Recorder'

/**
 * @description guide users to upload or record audio files
 * @class FileSelector
 * @extends {Component}
 */
class FileSelector extends Component {
    render() {
        return (
            <div>
                <Uploader>
                    <Button type='primary' shape='round' size='large' icon='upload'>
                        本地音频
                    </Button>
                </Uploader>
                <Button shape='round' size='large' icon='notification'>
                    录制音频
                </Button>
            </div>
        )
    }
}

export default FileSelector;