import React, { Component } from 'react'
import { Form, Icon, Input, Button, Col } from 'antd';
import { Link } from 'react-router-dom'

import { ContentLayout } from '../../../components/Layouts'

const contentLayout = {
    // < 576
    xs: { span: 24, offset: 0 },
    sm: { span: 6, offset: 0 }
}

// Login Form
class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, password } = values;
                this.props.handleLogin({ email, password });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <ContentLayout sider={false} app={true}>
                <Col {...contentLayout}>
                    <Form onSubmit={this.handleSubmit} className="form-content-background">
                        <Form.Item>
                            {
                                getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请输入邮箱！' }],
                                })(
                                    <Input prefix={<Icon type="user" className="prefix-icon" />} placeholder="E-mail" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码！' }],
                                })(
                                    <Input prefix={<Icon type="lock" className="prefix-icon" />} type="password" placeholder="密码" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登陆
                            </Button>
                            <Button type="default" style={{ width: '100%' }}>
                                <Link to="/register">立即注册</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </ContentLayout>
        );
    }
}

export default Form.create({ name: 'login' })(LoginForm);