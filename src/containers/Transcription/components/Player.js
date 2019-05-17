import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, Icon } from 'antd'

class MusicPlayer extends Component {
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card hoverable bordered title={<Icon type="download" />}>
                            <a href={this.props.midiPath}>下载MIDI</a>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable title={<Icon type="snippets" />}>
                            查看乐谱
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        midiPath: state.transcription.musicMidi,
    }
}

export default connect(mapStateToProps)(MusicPlayer);