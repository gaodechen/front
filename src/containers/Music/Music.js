// Music页面Root组件
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Carousel from '../Carousel'
import { ContentLayout } from '../../components/Layouts';
import { SongList } from '../SongList'

class WrappedMusic extends Component {
    componentDidMount() {
        this.props.getIndexSongList();
    }
    render() {
        return (
            <ContentLayout sider={false}>
                <Carousel />
                <SongList row={2} songList={[]} />
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
        getIndexSongList: () => {
            dispatch();
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedMusic)
);