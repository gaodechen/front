import { Component } from 'react';
import { connect } from 'react-redux';

import { actions } from '../../modules/home'

class Logout extends Component {
    componentWillMount() {
        this.props.handleLogout();
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
            dispatch(actions.userLogout())
        }
    }
}

const WrappedLogout = connect(mapStateToProps, mapDispatchToProps)(Logout)

export default WrappedLogout