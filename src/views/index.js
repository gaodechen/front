import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { BasicLayout } from '../components/Layouts'
import { LoginForm, RegisterForm, Logout } from '../containers/User'
import { Center } from '../containers/Center'
import { AuthRoute } from '../containers/AuthRoute'
import { NotFound } from '../components/NotFound'
import { Loading } from '../components/Loading'
import { Composition } from '../containers/Composition'
import { Music } from '../containers/Music'
import { actions as homeActions, fetch_types } from '../modules/home'
import { showMessage as showMsg } from '../containers/Message'

class Index extends Component {
    // 维护登陆态
    componentDidMount() {
        const { login, userInfo } = this.props;
        if (login && Object.keys(userInfo).length === 0) {
            this.props.getAuth();
        }
    }

    // 全局提示框
    componentWillReceiveProps(nextProps) {
        const { msg, clearMsg } = nextProps;
        if (msg && msg.content) {
            msg.type === fetch_types.SUCCEED ?
                showMsg('success', msg.content, clearMsg) :
                showMsg('error', msg.content, clearMsg)
        }
    }

    render() {
        const { isFetching } = this.props;

        // Basic Container
        return (
            <BasicLayout>
                <Switch>
                    <AuthRoute path="/login" check="notLogin" component={LoginForm} />
                    <AuthRoute path="/register" check="notLogin" component={RegisterForm} />
                    <AuthRoute path="/logout" component={Logout} />
                    <Route path='/composition' component={Composition} />
                    <AuthRoute path="/center" component={Center} />
                    <Route path="/music" component={Music} />
                    <Route path="/404" component={NotFound} />
                    <Route path="/" component={Music} />
                </Switch>
                {isFetching && <Loading />}
            </BasicLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        login: state.home.isLoggedIn,
        msg: state.home.msg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuth: () => {
            dispatch(homeActions.userAuth())
        },
        clearMsg: () => {
            dispatch(homeActions.clearMsg())
        }
    }
}

// 组件入口注入一次userInfo (componentWillMount)
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Index)
)