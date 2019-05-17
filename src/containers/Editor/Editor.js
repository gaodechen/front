import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Form, Input, Button, Upload, Icon, message } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import { ContentLayout } from '../../components/Layouts'

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
    wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, },
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0, },
        sm: { span: 20, offset: 4, },
    },
};

class Editor extends Component {
    state = {}

    saveArticle = (payload) => {
        let num = localStorage.getItem('num') || 0;
        localStorage.setItem('num', Number(num) + 1)
        localStorage.setItem('a' + Number(num), JSON.stringify(payload))
        num++;
    }

    customRequest = (option) => {
        let file = option.file;
        if (file) {
            this.setState({file: file})
            message.success('文件选择成功');
        } else {
            message.error('文件选择失败');
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    title: values.title,
                    content: values.content,
                    file: this.state.file,
                }
                this.saveArticle(submitData);
                message.success('提交成功!');
                this.props.history.push({
                    pathname: '/album',
                    state: submitData
                });
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <ContentLayout sider={false} >
                <div style={{ backgroundColor: '#fafafa', border: '2px dashed #e9e9e9', margin: '32px 0', padding: '0 40px' }}>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: '32px' }}>
                        <Form.Item {...formItemLayout} label="专辑标题">
                            <Input size="large" defaultValue="梁祝" />
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="正文">
                                <textarea
                                    style={{ height: '388px', width: '100%' }}
                                    defaultValue="梁祝是一个凄凉优美的中国古代爱情故事"
                                />
                        </Form.Item>
                        <Form.Item label="上传音乐"  {...formItemLayout} >
                            <Upload name="logo" customRequest={this.customRequest} accept={this.props.accept} fileList={[]}>
                                <Button>
                                    <Icon type="upload" /> 点击上传乐曲
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout} style={{ marginTop: '48px' }}>
                            <Button size="large" type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </div>
            </ContentLayout>
        )
    }
}

export default withRouter(Form.create()(Editor))