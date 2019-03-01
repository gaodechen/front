import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
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

class Editor extends Component {
    componentDidMount() {

        // 异步设置编辑器内容
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
            })
        }, 1000)

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
            <ContentLayout sider={false}>
                <Form onSubmit={this.handleSubmit} style={{ marginTop: '40px' }}>
                    <Form.Item {...formItemLayout} label="文章标题">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input size="large" placeholder="请输入标题" />
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="文章正文">
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
                    <Form.Item {...tailFormItemLayout}>
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </ContentLayout>
        )
    }
}

export default Form.create()(Editor)