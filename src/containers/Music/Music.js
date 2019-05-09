import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PageHeader, Icon } from 'antd'

import Carousel from '../Carousel'
import { ContentLayout } from '../../components/Layouts';
import { SongPinList } from '../SongPinList'
import { actions } from '../../modules/recommend'

/**
 * @description default Index & Music page
 * @class WrappedMusic
 * @extends {Component}
 */
class WrappedMusic extends Component {
    componentDidMount() {
        // this.props.getPosters();
    }

    render() {
        return (
            <div>
                <ContentLayout sider={false}>
                    <Carousel num={3} carousel={this.props.posters} />
                    <div className="music-page-content">
                        <PageHeader
                            backIcon={<Icon type="star"/>}
                            title="猜你喜欢"
                        />
                        <SongPinList row={2} col={4} songList={this.props.songList} />
                        <PageHeader
                            onBack={() => null}
                            title="换一批"
                            subTitle="再来几首！"
                        />
                    </div>
                </ContentLayout>
            </div>
        )
    }
}

WrappedMusic.defaultProps = {
    songList: [{
        title: 'Song 1',
        src: 'http://127.0.0.1:3002/static/thumbnail/1.jpg',
    }, {
        title: 'Song 2',
        src: 'http://127.0.0.1:3002/static/thumbnail/2.jpg',
    }, {
        title: 'Song 3',
        src: 'http://127.0.0.1:3002/static/thumbnail/3.jpg',
    }, {
        title: 'Song 4',
        src: 'http://127.0.0.1:3002/static/thumbnail/4.jpg',
    }, {
        title: 'Song 5',
        src: 'http://127.0.0.1:3002/static/thumbnail/5.jpg',
    }, {
        title: 'Song 6',
        src: 'http://127.0.0.1:3002/static/thumbnail/6.jpg',
    }, {
        title: 'Song 7',
        src: 'http://127.0.0.1:3002/static/thumbnail/7.jpg',
    }, {
        title: 'Song 8',
        src: 'http://127.0.0.1:3002/static/thumbnail/8.jpg',
    },
    ]
}


const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        recommend: state.recommend.songList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // get posters to display on carousel
        getPosters: () => {
            dispatch(actions.getPosters);
        },
        // get music recommendatios for userId
        getRecommend: (userId) => {
            dispatch(actions.getRecommend);
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedMusic)
);