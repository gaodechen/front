/**
 * @description route component for user authority
 * @class WrappedAuthRoute
 * @extends {Component}
 */
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import withUser from '../UserStatus' 

class WrappedAuthRoute extends Component {
    render() {
        /**
         *  @params props.login: whether user has logged in
          * @params props.check: render when props.login meets "check"
          * @params props.component: the component should be rendered
         */
        const { check, login, redirectUrl, component: Component, props, ...rest } = this.props;
        // condition = true when props.login meets "check" condition
        let condition = (check === "login") ? login : !login;

        if (condition) {
            // render component
            return (
                <Route {...rest} render={(props) => <Component {...props} />} />
            )
        } else {
            // redirect
            return (
                <Redirect to={redirectUrl} />
            )
        }
    }
}

WrappedAuthRoute.defaultProps = {
    check: "login",
    redirectUrl: "/",
};

export default withUser(
    connect()(WrappedAuthRoute)
)