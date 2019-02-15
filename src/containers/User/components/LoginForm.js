import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'

import './style.css'

// Login Form
class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, password, remember } = values;
                this.props.handleLogin(email, password, remember);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                    {
                        getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )
                    }
                    <Link className="login-form-forgot" to="/music">忘记密码</Link>
                    <Button type="primary" htmlType="submit" className="login-button">
                        登陆
                    </Button>
                    <Button type="default" className="go-register-button">
                        <Link to="/register">立即注册</Link>
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({ name: 'login' })(LoginForm);