import React, { Component } from 'react'

import { Form, Input, Tooltip, Icon, Button, Row, Col } from 'antd';

import './style.css'

const contentLayout = {
    // < 576
    xs: { span: 24, offset: 0 },
    sm: { span: 9, offset:  0 }
}

class RegisterForm extends Component {
    // confirm field
    state = { confirmDirty: false };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { email, username, password } = values;
                this.props.handleRegister(email, username, password);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不相同！');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        // Form.Item布局
        const formItemLayout = {
            // 标签元素占位
            labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
            // 输入元素占位
            wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, },
        };
        // Form底部按钮
        const tailFormItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0, },
                sm: { span: 20, offset: 4, },
            },
        };

        return (
            <Row className="flex-row" type="flex">
                <Col {...contentLayout}>
                    <Form onSubmit={this.handleSubmit} className="register-form">
                        <Form.Item {...formItemLayout} label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [{
                                    type: 'email', message: '邮箱无效！',
                                }, {
                                    required: true, message: '请输入邮箱！',
                                }],
                            })(
                                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入密码！',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="确认密码">
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '请确认您的密码！',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label={(
                                <span>
                                    用户名&nbsp;
                            <Tooltip title="输入您用于显示的昵称">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入您的用户名!', whitespace: true }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" block>注册</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Form.create({ name: 'register' })(RegisterForm);