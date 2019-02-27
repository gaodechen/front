// 歌单页面
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import { Pin } from '../SongList/components'
import { actions } from '../../modules/recommend'

// row / col 推送的行列数，根据24格布局确定span
class SongList extends Component {
    // 获取一行的Pin
    getRow = () => {
        let row = [];
        let span = 24 / this.props.col;
        for (var i = 0; i < this.props.col; i++) {
            row.push(
                <Col span={span} key={'col' + i}>
                    <Pin />
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
                    {this.getRow()}
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
            dispatch(actions.getRecommend());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongList);