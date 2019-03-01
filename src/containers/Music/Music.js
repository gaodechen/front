// Music页面Root组件
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Carousel from '../Carousel'
import { ContentLayout } from '../../components/Layouts';
import { SongList } from '../SongList'
import { actions } from '../../modules/recommend'

class WrappedMusic extends Component {
    componentDidMount() {
        // 获取首页推送的poster歌单以及单曲
        this.props.getIndexRecommend();
    }

    render() {
        return (
            <ContentLayout sider={false}>
                <Carousel num={3} carousel={this.props.posters}/>
                <SongList row={2} col={3} songList={this.props.songList} />
            </ContentLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        recommend: state.recommend.songList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getIndexRecommend: (userID) => {
            dispatch(actions.getRecommend(userID));
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedMusic)
);