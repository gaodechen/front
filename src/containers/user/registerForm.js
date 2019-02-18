import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { actions as homeActions } from '../../modules/home'
import { RegisterForm } from './components'

class RegisterContainer extends Component {
    render() {
        const { handleRegister } = this.props;
        return (
            <RegisterForm handleRegister={handleRegister} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleRegister: (email, username, password) => {
            dispatch(homeActions.userRegister(email, username, password))
        },
    }
}

export default withRouter(
    connect(null, mapDispatchToProps)(RegisterContainer)
)