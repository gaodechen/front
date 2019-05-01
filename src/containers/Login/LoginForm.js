import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { actions as homeActions } from '../../modules/home'
import LoginForm from './components'

class LoginContainer extends Component {
    render() {
        const { handleLogin } = this.props;
        return (
            <LoginForm handleLogin={handleLogin} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (userInfo) => {
            dispatch(homeActions.userLogin(userInfo))
        },
    }
}

export default withRouter(
    connect(null, mapDispatchToProps)(LoginContainer)
)