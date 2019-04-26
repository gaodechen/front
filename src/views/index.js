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

/**
 * @description component for the entrance of App
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
    /**
     * @description update userinfo after session expired
     * @memberof Index
     */
    componentDidMount() {
        const { login, userInfo } = this.props;
        if (login && Object.keys(userInfo).length === 0) {
            this.props.getAuth();
        }
    }

    /**
     * @description show message with dialog, and call clearMsg after confirming
     * @param {*} nextProps
     * @memberof Index
     */
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

        // Basic Container & Router list
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

Index.defaultProps = {
    isFetching: false,
}

const mapStateToProps = (state) => {
    return {
        // maintain user status
        userInfo: state.home.userInfo,
        // check if user is logged in
        login: state.home.isLoggedIn,
        // message from request response
        msg: state.home.msg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // get userinfo when authority is required when user has not logged in
        getAuth: () => {
            dispatch(homeActions.userAuth())
        },
        clearMsg: () => {
            dispatch(homeActions.clearMsg())
        }
    }
}

// inject props
export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Index)
)