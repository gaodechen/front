import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { actions as homeActions, fetch_types } from '../../modules/home'
import { RegisterForm } from './components'
import { Loading } from '../Loading'
import { showMessage } from '../Message'

class RegisterContainer extends Component {
    componentWillReceiveProps(nextProps) {
        const { isFetching, msg } = nextProps;
        // FETCH_END之后才会SET_MSG
        if (!this.props.isFetching && !isFetching && msg && msg.content) {
            if (msg.type === fetch_types.SUCCEED) {
                showMessage('success', msg.content)
            } else {
                showMessage('error', msg.content)
            }
        }
    }

    render() {
        const { handleRegister, isFetching } = this.props;
        return (
            <div>
                {isFetching && <Loading />}
                <RegisterForm handleRegister={handleRegister} isFetching={isFetching} />
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
        handleRegister: (email, username, password) => {
            dispatch(homeActions.userRegister(email, username, password))
        },
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
)