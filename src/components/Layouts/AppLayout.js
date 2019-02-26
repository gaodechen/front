// 应用样式的布局容器: 全屏居中
import React, { Component } from 'react'
import { Layout } from 'antd'

import { Navigator } from '../../containers/Navigator'
import './style.css'

const { Header, Footer } = Layout;

class BasicLayout extends Component {
    render() {
        return (
            <Layout className="basic-layout">
                <Header>
                    <Navigator />
                </Header>

                {this.props.children}

                <Footer className="layout-footer">
                    Musicine ©2019 Created by Code & Note
                </Footer>
            </Layout>
        )
    }
}

export default BasicLayout