import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { actions as homeActions, fetch_types } from '../../modules/home'
import { LoginForm } from './components'
import { Loading } from '../Loading'
import { showMessage } from '../Message'

class LoginContainer extends Component {
    componentWillReceiveProps(nextProps) {
        const { isFetching, msg } = nextProps;
        // FETCH_END -> SET_MSG
        if (!this.props.isFetching && !isFetching && msg && msg.content) {
            if (msg.type === fetch_types.SUCCEED) {
                showMessage('success', msg.content)
            } else {
                showMessage('error', msg.content)
            }
        }
    }

    render() {
        const { handleLogin, isFetching } = this.props;
        return (
            <div>
                {isFetching && <Loading />}
                <LoginForm handleLogin={handleLogin} history={this.props.history} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.home.isFetching,
        msg: state.home.msg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogin: (email, password, remember) => {
            dispatch(homeActions.userLogin(email, password, remember))
        },
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
)
