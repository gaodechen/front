import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import { LoginForm, RegisterForm, Logout } from '../containers/User'
import { Navigator } from '../containers/Navigator'
import { AuthRoute } from '../containers/AuthRoute'
import { NotFound } from '../components/NotFound'
import Music from '../containers/Music'

const { Header, Footer, Content } = Layout;

class Index extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    <Navigator />
                </Header>

                <Content>
                    <Switch>
                        <AuthRoute path="/login" check="notLogin" component={LoginForm} />
                        <AuthRoute path="/register" check="notLogin" component={RegisterForm} />
                        <AuthRoute path="/logout" check="login" component={Logout} />
                        <Route path="/music" component={Music} />
                        <Route path="/404" component={NotFound} />
                        <Route path="/" component={Music} />
                    </Switch>
                    asdf
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Musicine ©2019 Created by Code & Note
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(Index)