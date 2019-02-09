import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd'

import { actions as homeActions } from '../../modules/home'
import { actions as formActions } from '../../modules/form'
import { LoginForm } from './components'

class WrappedLoginContainer extends Component {
    render() {
        const { userInfo, visible, onCancel, handleLogin } = this.props;
        if (userInfo) {
            return (
                <LoginForm visible={visible} onCancel={onCancel} handleLogin={handleLogin} />
            )
        } else {
            return (
                Modal.error({ title: '错误', content: '您已经登陆' })
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.form.visible.loginForm,
        userInfo: state.home.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (email, password, remember) => {
            dispatch(homeActions.userLogin(email, password, remember))
        },
        onCancel: () => {
            dispatch(formActions.hideForm("loginForm"))
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(WrappedLoginContainer)

export default LoginContainer