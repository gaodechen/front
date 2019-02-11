import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions as homeActions } from '../../modules/home'
import { actions as formActions } from '../../modules/form'
import { LoginForm } from './components'

class WrappedLoginContainer extends Component {
    render() {
        const { visible, onCancel, goRegister, handleLogin } = this.props;
        return (
            <LoginForm
                visible={visible}
                onCancel={onCancel}
                goRegister={goRegister}
                handleLogin={handleLogin}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.form.visible.loginForm,
        isLoggedIn: state.home.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (email, password, remember) => {
            dispatch(homeActions.userLogin(email, password, remember))
        },
        onCancel: () => {
            dispatch(formActions.hideForm("loginForm"))
        },
        goRegister: () => {
            dispatch(formActions.showForm("registerForm"))
        }
    }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(WrappedLoginContainer)

export default LoginContainer