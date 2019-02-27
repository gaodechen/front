// 音乐详情页面
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { MusicDetail } from './components'

class WrappedMusicDetail extends Component {
    render() {
        console.log(this.props.match);
        return (
            <MusicDetail />
        )
    }
}

export default withRouter(
    connect()(WrappedMusicDetail)
);