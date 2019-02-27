// 歌单页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import Pin from '../SongPin'
import { actions } from '../../modules/recommend'

// row / col 推送的行列数，根据24格布局确定span
class SongList extends Component {
    componentDidMount() {
        this.props.getIndexRecommend();
    }

    // 获取一行的Pin
    getRow = (rowNum) => {
        const { col } = this.props;
        let row = [];
        let span = 24 / col;
        for (var i = 0; i < col; i++) {
            row.push(
                <Col span={span} key={'col' + i}>
                    <Pin
                        onLike={this.props.onLike}
                        pin={this.props.songList[col * rowNum + i]}
                    />
                </Col>
            );
        }
        return row;
    }

    getRows = () => {
        let rows = [];
        for (var i = 0; i < this.props.row; i++) {
            rows.push(
                <Row gutter={16} style={{ margin: '32px' }} key={i}>
                    {this.getRow(i)}
                </Row>
            );
        }
        return rows;
    }

    render() {
        return (
            <div>
                {this.getRows()}
            </div>
        )
    }
}

SongList.defaultProps = {
    col: 3,
    row: 3,
    songList: [
        {
            alt: 'cover',
            coverSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551298893003&di=4ee779f5f0badf5b4564500ee555b431&imgtype=0&src=http%3A%2F%2Fwww.cnscore.com%2Fuploads%2Fallimg%2F180929%2F13321J0a-1.jpg",
            title: '逍遥叹',
            description: '胡歌',
        },
        {
            alt: 'cover',
            coverSrc: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551298968649&di=458d1a59d491ed1cc11c4c7136ed06ea&imgtype=0&src=http%3A%2F%2Fimg5.cache.netease.com%2Fhouse%2F2014%2F8%2F21%2F2014082111234494be9_550.png",
            title: '喜欢你',
            description: '邓紫棋',
        },
        {
            alt: 'cover',
            coverSrc: "https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=498657f7912397ddc274905638ebd9d2/9a504fc2d5628535c963bc3190ef76c6a7ef631a.jpg",
            title: '春天奏鸣曲',
            description: '贝多芬'
        },
        {},
        {}
    ]
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        // songList: state.recommend.collections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getIndexRecommend: (userID) => {
            dispatch(actions.getRecommend(userID));
        },
        handleLike: (userID, musicID) => {
            dispatch(actions.addLike(userID, musicID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);