import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import { Navigator } from '../containers/navigator'
import { LoginForm, RegisterForm, Logout } from '../containers/user'

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
                        <Route path="/login" component={LoginForm} />
                        <Route path="/register" component={RegisterForm} />
                        <Route path="/logout" component={Logout} />
                    </Switch>
                </Content>

                <Footer style={{ textAlign: "center" }}>
                    Footer
                </Footer>
            </Layout>
        )
    }
}

export default IndexLayout