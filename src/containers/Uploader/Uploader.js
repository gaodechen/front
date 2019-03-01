import React, { Component } from 'react'
import { Upload, message, Button, Icon } from 'antd';

import { addr_config } from '../../config'

const props = {
    name: 'file',
    action: addr_config.FILE_SERVER_ADDR,
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        /* if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        } */
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功！`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    },
};

class Uploader extends Component {
    render() {
        return (
            <Upload {...props}>
                <Button type="primary" size="large">
                    <Icon type="upload" /> 上传音频
                </Button>
            </Upload>
        )
    }
}

export default Uploader;