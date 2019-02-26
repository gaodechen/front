// 歌单页面
import React, { Component } from 'react'
import { Row, Col } from 'antd'

import { Pin } from '../SongList/components'

class SongList extends Component {
    getRows = () => {
        let rows = [];
        for (var i = 0; i < this.props.row; i++) {
            rows.push(
                <Row gutter={16} style={{ margin: '32px' }} key={i}>
                    <Col span={8}>
                        <Pin />
                    </Col>
                    <Col span={8}>
                        <Pin />
                    </Col>
                    <Col span={8}>
                        <Pin />
                    </Col>
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

export default SongList;