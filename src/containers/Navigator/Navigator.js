import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Navigator from './components'

/**
 * @description default navigator
 * @class WrappedNavigator
 * @extends {Component}
 */
class WrappedNavigator extends Component {
    render() {
        const { userInfo, isLoggedIn, location } = this.props;
        return (
            <Navigator userInfo={userInfo} isLoggedIn={isLoggedIn} location={location} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        isLoggedIn: state.home.isLoggedIn
    }
}

export default withRouter(
    connect(mapStateToProps)(WrappedNavigator)
)