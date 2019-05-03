import React, { Component } from 'react'
import { connect } from 'react-redux'

import { ContentLayout } from '../../components/Layouts'
import UserSettingForm from './components'
import { actions } from '../../modules/home'

/**
 * @description User Setting page
 * @class WrappedUserSetting
 * @extends {Component}
 */
class WrappedUserSetting extends Component {
    render() {
        return (
            <ContentLayout sider={false} app={true}>
                <UserSettingForm
                    userInfo={this.props.userInfo}
                    updateUserInfo={this.props.updateUserInfo}
                />
            </ContentLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserInfo: (userInfo) => {
            dispatch(actions.updateUserInfo(userInfo))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedUserSetting)