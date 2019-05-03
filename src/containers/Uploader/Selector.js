import React, { Component } from 'react'
import { Upload, message } from 'antd';

/**
 * @description select files from locale
 * @class Selector
 * @extends {Component}
 */
class Selector extends Component {
    /**
     * @description read file from locale using FileReader
     * @memberof Selector
     */
    customRequest = (option) => {
        let file = option.file;
        if (file) {
            this.props.setAudio(file);
            message.success('文件选择成功');
        } else {
            message.error('文件选择失败');
        }
    }

    render() {
        // using props.children to customize Selector component
        return (
            <Upload accept={this.props.accept} customRequest={this.customRequest} fileList={this.props.fileList}>
                {
                    React.Children.map(this.props.children, (child, i) => {
                        return child
                    })
                }
            </Upload>
        )
    }
}

Selector.defaultProps = {
    accept: 'audio/mid, audio/wav, audio/mp3, audio/flac',
}

export default Selector;