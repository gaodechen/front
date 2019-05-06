import React, { Component } from 'react'
import { Progress } from 'antd';

/**
 * @description progress bar
 * @class ProgressBar
 * @extends {Component}
 */
class ProgressBar extends Component {
    render() {
        return (
            <Progress percent={this.props.percent} />
        );
    }
}

export default ProgressBar