import { Component } from 'react';
import { connect } from 'react-redux';

import { actions as homeActions, fetch_types } from '../../modules/home'
import { showMessage } from '../Message'

class Logout extends Component {
    componentWillMount() {
        this.props.handleLogout();
    }

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
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        msg: state.home.msg,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => {
            dispatch(homeActions.userLogout())
        }
    }
}

const WrappedLogout = connect(mapStateToProps, mapDispatchToProps)(Logout)

export default WrappedLogout