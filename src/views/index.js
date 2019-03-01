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
import { Music, MusicDetail } from '../containers/Music'
import { UserPage } from '../containers/UserPage'
import { Transcription } from '../containers/Transcription'
import { Editor } from '../containers/Editor'
import { Article } from '../containers/Article'
import { showMessage as showMsg } from '../containers/Message'

import { actions as homeActions, fetch_types } from '../modules/home'

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
                    <Route path="/composition" component={Composition} />
                    <Route path="/transcription" component={Transcription} />
                    <Route path="/center/:id" component={UserPage} />
                    <AuthRoute path="/center" component={Center} />
                    <AuthRoute path="/editor" component={Editor} />
                    <Route path="/articles/:id?" component={Article} />
                    <Route path="/music/:id" component={MusicDetail} />
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