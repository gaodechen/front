import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import { LoginForm, RegisterForm, Logout } from '../containers/User'
import { Navigator } from '../containers/Navigator'
import { AuthRoute } from '../containers/AuthRoute'
import { NotFound } from '../components/NotFound'
import Music from '../containers/Music'

const { Header, Footer, Content } = Layout;

class IndexLayout extends Component {
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
                    </Switch>
                    asdfasdfasfasdf
                </Content>

                <Footer style={{ textAlign: "center" }}>
                    Footer
                </Footer>
            </Layout>
        )
    }
}

export default IndexLayout