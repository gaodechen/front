import React, { Component } from 'react';
import { connect } from 'react-redux'

import { actions as formActions } from '../../modules/form'
import Navigator from './components'

class WrappedNavigator extends Component {
    render() {
        const {userInfo, isLoggedIn, showForm} = this.props;
        return (
            // 根据用户状态渲染菜单
            <Navigator userInfo={userInfo} isLoggedIn={isLoggedIn} showForm={showForm} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        isLoggedIn: state.home.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // Currying!
        showForm: (form) => () => {
            dispatch(formActions.showForm(form))
        }
    }
}

const NavigatorContainer = connect(mapStateToProps, mapDispatchToProps)(WrappedNavigator)

export default NavigatorContainer