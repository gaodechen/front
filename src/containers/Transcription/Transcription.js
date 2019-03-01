import React, { Component } from 'react'
import { Row } from 'antd'

import Uploader from '../Uploader'

class Transcription extends Component {
    render() {
        return (
            <Row className="flex-row">
                <Uploader />
            </Row>
        );
    }
}

export default Transcription;