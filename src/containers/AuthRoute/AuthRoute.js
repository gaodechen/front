import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { actions } from '../../modules/home'

class WrappedAuthRoute extends React.Component {
    componentWillMount() {
        this.props.getAuth();
    }

    render() {
        // check：Auth需要的状态
        // check="login"：登陆状态才能渲染组件，否则跳转
        // const { pathname } = this.props.location;
        const { check, login, redirectUrl = "/", ...rest } = this.props;
        // 检查check是否为真
        let condition = (check === "login") ? login : !login; 

        if (condition) {
            // 如果为真，渲染组件
            return (
                <Route {...rest} />
            )
        } else {
            // 如果为假，跳转到redirectUrl
            return (
                <Redirect to={redirectUrl} />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.home.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAuth: () => {
            dispatch(actions.userAuth(0))
        }
    }
}

const AuthRoute = withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedAuthRoute))

export default AuthRoute