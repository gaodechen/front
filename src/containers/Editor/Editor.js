import React, { Component } from 'react'
import { Form, Input, Button, Upload, Icon, message } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import { ContentLayout } from '../../components/Layouts'

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
    // 输入元素占位
    wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, },
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0, },
        sm: { span: 20, offset: 4, },
    },
};

const Dragger = Upload.Dragger;

const draggerProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} 文件上传成功！`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Editor extends Component {
    componentDidMount() {
        /* setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
            })
        }, 1000)*/
    }

    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    title: values.title,
                    content: values.content.toRAW() // or values.content.toHTML()
                }
                console.log(submitData)
            }
        })

    }

    render() {

        const { getFieldDecorator } = this.props.form
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']

        return (
            <ContentLayout sider={false} >
                <div style={{backgroundColor: '#fafafa', border: '2px dashed #e9e9e9', margin: '32px 0'}}>
                    <Form onSubmit={this.handleSubmit} style={{ marginTop: '40px' }}>
                        <Form.Item {...formItemLayout} label="页面标题">
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: '请输入标题',
                                }],
                            })(
                                <Input size="large" placeholder="请输入标题" />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="正文">
                            {getFieldDecorator('content', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        if (value.isEmpty()) {
                                            callback('请输入正文内容')
                                        } else {
                                            callback()
                                        }
                                    }
                                }],
                            })(
                                <BraftEditor
                                    className="my-editor"
                                    controls={controls}
                                    placeholder="请输入正文内容"
                                />
                            )}
                        </Form.Item>
                        <Dragger {...draggerProps}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击或拖拽上传文件至此</p>
                            <p className="ant-upload-hint">上传封面</p>
                        </Dragger>
                        <Form.Item {...tailFormItemLayout} style={{marginTop: '48px'}}>
                            <Button size="large" type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </div>
            </ContentLayout>
        )
    }
}

export default Form.create()(Editor)