import React, { Component } from 'react';
import { connect } from 'react-redux'

import { actions as formActions } from '../../modules/form'
import Navigator from './components'

class WrappedNavigator extends Component {
    render() {
        return (
            // 根据用户状态渲染菜单
            <Navigator
                userInfo={this.props.userInfo}
                showForm={this.props.showForm}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showForm: (form) => {
            dispatch(formActions.showForm(form))
        }
    }
}

const NavigatorContainer = connect(mapStateToProps, mapDispatchToProps)(WrappedNavigator)

export default NavigatorContainer