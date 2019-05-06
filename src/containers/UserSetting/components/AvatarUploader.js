import React, { Component } from 'react'

import { static_addr } from '../../../config'
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isValid = (file.type === 'image/jpeg') || (file.type === 'image/png');
    if (!isValid) {
        message.error('图像格式不支持！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图像大小不能超过2MB！');
    }
    return isValid && isLt2M;
}

/**
 * @description Upload and show avatar
 * @class AvatarUploader
 * @extends {Component}
 */
class AvatarUploader extends Component {
    state = {
        loading: false,
    };

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );

        const avatarName = this.props.userInfo.avatar;
        let imageUrl = this.state.imageUrl;
        if(!imageUrl)
            imageUrl = static_addr.AVATAR + '/' + avatarName;

        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={static_addr.AVATAR}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" width='128px'/> : uploadButton}
            </Upload>
        );
    }
}

export default AvatarUploader;