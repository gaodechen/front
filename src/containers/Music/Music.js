import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Carousel from '../Carousel'
import { ContentLayout } from '../../components/Layouts';
import { SongList } from '../SongList'
import { actions } from '../../modules/recommend'

/**
 * @description default Index & Music page
 * @class WrappedMusic
 * @extends {Component}
 */
class WrappedMusic extends Component {
    componentDidMount() {
        this.props.getPosters();
    }

    render() {
        return (
            <div>
                <ContentLayout sider={false}>
                    <Carousel num={3} carousel={this.props.posters} />
                    <SongList row={2} col={4} songList={this.props.songList} />
                </ContentLayout>
            </div>
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
        getPosters: (userID) => {
            dispatch(actions.getRecommend(userID));
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedMusic)
);