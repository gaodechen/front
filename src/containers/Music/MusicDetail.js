// 音乐详情页面
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { MusicDetail } from './components'
import { actions } from '../../modules/music'
import { ContentLayout } from '../../components/Layouts';

class WrappedMusicDetail extends Component {
    componentDidMount() {
        // 根据Url确定音乐ID
        const { params } = this.props.match;
        this.props.getMusic(params);
    }

    render() {
        return (
            <ContentLayout sider={false} style={{marginTop: '32px'}}>
                <MusicDetail musicInfo={this.props.musicInfo} />
            </ContentLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        musicInfo: state.music.music,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMusic: (musicID) => {
            dispatch(actions.getMusic(musicID));
        },
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedMusicDetail)
);