import React, { Component } from 'react'
import { connect } from 'react-redux';

import { ContentLayout } from '../../components/Layouts'
import { actions } from '../../modules/uploader'
import Uploader from '../Uploader'

/**
 * @description Transcription App
 * @class Transcription
 * @extends {Component}
 */
class Transcription extends Component {
    render() {
        return (
            <ContentLayout sider={false} app={true}>
                <Uploader fileList={this.props.fileList} setFileList={this.props.setFileList} />
            </ContentLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fileList: state.uploader.fileList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFileList: (fileList) => {
            dispatch(actions.setFileList(fileList))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transcription);