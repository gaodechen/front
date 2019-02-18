import { Component } from 'react';
import { connect } from 'react-redux';

import { actions as homeActions } from '../../modules/home'

class Logout extends Component {
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