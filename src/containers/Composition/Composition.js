import React, { Component } from 'react'
import { Row } from 'antd'

import Recorder from './Recorder'
import Uploader from './Uploader'

class Composition extends Component {
    render() {
        return (
            <Row className="flex-row" style={{flexDirection:'column'}}>
                <Row style={{justifyContent: 'center'}}>
                    <Recorder />
                </Row>
                <Row>
                    <Uploader />
                </Row>
            </Row>
        )
    }
}

export default Composition;