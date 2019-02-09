import React, { Component } from 'react'
import { connect } from 'react-redux';

import { actions as homeActions } from '../../modules/home'
import { actions as formActions } from '../../modules/form'
import RegisterForm from './components/registerForm'

class WrappedRegisterContainer extends Component {
    render() {
        return (
            <div>
                <RegisterForm
                    visible={this.props.visible}
                    onCancel={this.props.onCancel}
                    handleRegister={this.props.handleRegister}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visible: state.form.visible.registerForm,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleRegister: (email, username, password) => {
            dispatch(homeActions.userRegister(email, username, password))
        },
        onCancel: () => {
            dispatch(formActions.hideForm("registerForm"))
        }
    }
}

const RegisterFormContainer = connect(mapStateToProps, mapDispatchToProps)(WrappedRegisterContainer)

export default RegisterFormContainer