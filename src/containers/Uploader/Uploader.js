import React, { Component } from 'react'
import { Upload, message } from 'antd';

/**
 * @description upload files to server
 * @class Uploader
 * @extends {Component}
 */
class Uploader extends Component {
    handleChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功！`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }

        let fileList = info.fileList;

        // Limit the number of uploaded files
        // Old one will be replaced by the new
        fileList = fileList.slice(-1);

        // Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.props.setFileList(fileList);
    }

    render() {
        // select files from locale
        const uploaderProps = {
            name: 'file',
            headers: {
                authorization: 'authorization-text',
            },
            action: this.props.action,
            accept: this.props.accept,
            onChange: this.handleChange,
        };

        // using props.children to customize Uploader component
        return (
            <Upload {...uploaderProps} fileList={this.props.fileList}>
                {
                    React.Children.map(this.props.children, (child, i) => {
                        return child
                    })
                }
            </Upload>
        )
    }
}

Uploader.defaultProps = {
    action: '/api/file',
    accept: 'audio/mid, audio/wav, audio/mp3, audio/flac',
}

export default Uploader;