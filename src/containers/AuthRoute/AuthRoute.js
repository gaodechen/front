// 为路由添加路由权限保护的高阶组件
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { withUser } from '../User' 

class WrappedAuthRoute extends Component {
    render() {
        // check：Auth需要的状态
        // check="login"：登陆状态才能渲染组件，否则跳转
        // const { pathname } = this.props.location;
        const { check = "login", login, redirectUrl = "/", component: Component, props, ...rest } = this.props;
        // 检查check是否为真
        let condition = (check === "login") ? login : !login;

        if (condition) {
            // 如果为真，渲染组件
            return (
                <Route {...rest} render={(props) => <Component {...props} />} />
            )
        } else {
            // 如果为假，跳转到redirectUrl
            return (
                <Redirect to={redirectUrl} />
            )
        }
    }
}

export default withUser(
    connect()(WrappedAuthRoute)
)