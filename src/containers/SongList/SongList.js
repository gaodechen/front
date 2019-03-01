// 歌单页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import Pin from '../SongPin'
import { actions, rec_types } from '../../modules/recommend'

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
            <div style={{marginTop: '40px'}}>
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
        },
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
        // 首页歌曲推荐
        getIndexRecommend: (userID) => {
            dispatch(actions.getRecommend(userID));
        },
        // 首页歌单海报推荐
        getIndexPoster: (userID) => {
            dispatch(actions.getRecommend(userID, rec_types.ALBUM, 4))
        },
        handleLike: (userID, musicID) => {
            dispatch(actions.addLike(userID, musicID));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);