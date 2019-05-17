import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PageHeader, Button, Icon } from 'antd'

import Carousel from '../Carousel'
import { ContentLayout } from '../../components/Layouts';
import { SongPinList } from '../SongPinList'
import { actions } from '../../modules/recommend'
import songList from '../../config/data'

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length - 1, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

/**
 * @description default Index & Music page
 * @class WrappedMusic
 * @extends {Component}
 */
class WrappedMusic extends Component {
    state = { songList: getRandomArrayElements(songList, 8) }

    componentDidMount() {
        // this.props.getRecommend(this.props.userInfo._id);
    }

    getRecommend = () => {
        this.setState({songList: getRandomArrayElements(songList, 8)});
    }

    render() {
        return (
            <div>
                <Carousel num={3} carousel={this.props.posters} />
                <ContentLayout sider={false}>
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '48px',
                        marginBottom: '0',
                    }}
                >
                    <h3 style={{ fontSize: '32px', color: '#fff'}}>猜你喜欢</h3>
                </div>
                    <div className="music-page-content" style={{ margin: '60px' }}>
                        <SongPinList row={3} col={3} key={Date.now()} songList={this.state.songList} />
                        <Button onClick={this.getRecommend}>
                            换一批
                        </Button>
                    </div>
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
        // get music recommendatios for userId
        getRecommend: (userId) => {
            dispatch(actions.getRecommend({ _id: userId, recType: 'music', recNum: 8 }));
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedMusic)
);