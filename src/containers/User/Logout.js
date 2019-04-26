import { Component } from 'react';
import { connect } from 'react-redux';

import { actions as homeActions } from '../../modules/home'

/**
 * @description Logout should be mounted when logging out
 * @class Logout
 * @extends {Component}
 */
class Logout extends Component {
    /**
     * @description send asyn request for logging out operation
     * @memberof Logout
     */
    componentDidMount() {
        this.props.handleLogout();
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => {
            dispatch(homeActions.userLogout())
        }
    }
}

const WrappedLogout = connect(null, mapDispatchToProps)(Logout)

export default WrappedLogout