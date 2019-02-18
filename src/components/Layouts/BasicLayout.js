import React, { Component } from 'react'
import { Layout } from 'antd'

import { Navigator } from '../../containers/Navigator'

const { Header, Footer, Content } = Layout;

class BasicLayout extends Component {
    render() {
        return (
            <Layout>
                <Header>
                    <Navigator />
                </Header>

                <Content>
                    {this.props.children}
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Musicine ©2019 Created by Code & Note
                </Footer>
            </Layout>
        )
    }
}

export default BasicLayout