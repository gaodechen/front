// 歌单页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import Pin from '../SongPin'
import { actions } from '../../modules/recommend'

/**
 * @@description display a list of songs
 * @class SongList
 * @extends {Component}
 */
class SongList extends Component {
    componentDidMount() {
        this.props.getPostersAndRecommend();
    }

    // display one row for songs
    getRow = (rowNum) => {
        const { col } = this.props;
        let row = [];
        let span = 24 / col;
        for (var i = 0; i < col; i++) {
            row.push(
                <Col span={span} key={col * rowNum + i}>
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
    songList: []
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        // songList: state.recommend.collections,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // get reommend songs' list for userId
        getPostersAndRecommend: (userId) => {
            dispatch(actions.getRecommend(userId));
        },
        handleLike: (userId, musicId) => {
            dispatch(actions.addLike(userId, musicId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);