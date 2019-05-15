import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Slider, Row, Col, Switch } from 'antd'

import { actions } from '../../modules/styleTransfer'

/**
 * @description args fixed for music generator
 * @class TransferSetting
 * @extends {Component}
 */
class TransferSetting extends Component {
    onTransferAmplitudeAfterChange = (value) => {
        this.props.setArgs({transferAmplitude: value});
    };

    onNoteRangeAfterChange = (value) => {
        this.props.setArgs({noteRange: value});
    };

    onSwitchChanged = (checked) => {
        this.props.setArgs({isPiano: checked});
    };

    render() {
        return (
            <div style={{height: '248px', paddingTop: '6%'}}>
                <Row align='middle'>
                    <Col sm={{span: 4}}>
                        <p>变化幅度</p>
                    </Col>
                    <Col sm={{span: 20}}>
                        <Slider
                            defaultValue={this.props.transferAmplitude}
                            onAfterChange={this.onTransferAmplitudeAfterChange}
                            max={200}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={{span: 4}}>
                        <p>音符区间</p>
                    </Col>
                    <Col sm={{span: 20}}>
                        <Slider
                            range
                            min={36}
                            max={84}
                            defaultValue={this.props.noteRange}
                            onAfterChange={this.onNoteRangeAfterChange}
                        />
                    </Col>
                </Row>
                <Row justify='start'>
                    <Col sm={{span: 4}}>
                        <p>是否为钢琴音乐</p>
                    </Col>
                    <Col sm={{span: 1}} xs={{span:24}}>
                        <Switch defaultChecked onChange={this.onSwitchChanged}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        transferAmplitude: state.styleTransfer.transferAmplitude,
        noteRange: state.styleTransfer.noteRange,
        isPiano: state.styleTransfer.isPiano,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setArgs: (payload) => {
            dispatch(actions.setTransferArgs(payload));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferSetting);