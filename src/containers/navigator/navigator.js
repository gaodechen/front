import React, { Component } from 'react';
import { connect } from 'react-redux'

import Navigator from './components'

class WrappedNavigator extends Component {
    render() {
        const {userInfo, isLoggedIn } = this.props;
        return (
            // 根据用户状态渲染菜单
            <Navigator userInfo={userInfo} isLoggedIn={isLoggedIn} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        isLoggedIn: state.home.isLoggedIn
    }
}

const NavigatorContainer = connect(mapStateToProps)(WrappedNavigator)

export default NavigatorContainer