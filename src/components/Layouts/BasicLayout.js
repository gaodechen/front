import React, { Component } from 'react'
import { Layout } from 'antd'

import { Navigator } from '../../containers/Navigator'
import './style.css'

const { Header, Footer, Content } = Layout;

class BasicLayout extends Component {
    render() {
        return (
            <Layout className="basic-layout">
                <Header>
                    <Navigator />
                </Header>

                <Content className="basic-layout-content">
                    {this.props.children}
                </Content>

                <Footer className="layout-footer">
                    Musicine ©2019 Created by Code & Note
                </Footer>
            </Layout>
        )
    }
}

export default BasicLayout