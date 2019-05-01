import React, { Component } from 'react'
import { Upload, message, Button } from 'antd';

import uploadLogo from '../../static/upload.svg'

/**
 * @description upload files to node server
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
        const uploaderProps = {
            name: 'file',
            headers: {
                authorization: 'authorization-text',
            },
            action: '/api/file',
            accept: "audio/*",
            onChange: this.handleChange,
        };

        return (
            <span style={{ textAlign: 'center' }}>
                <Upload {...uploaderProps} fileList={this.props.fileList}>
                    <Button
                        shape="circle"
                        style={{ width: '100px', height: '100px' }}
                    >
                        <img src={uploadLogo} alt="Audio" width='50%' />
                    </Button>
                </Upload>
            </span>
        )
    }
}

export default Uploader;