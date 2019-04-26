import React, { Component } from 'react'
import { Layout } from 'antd'

import { Navigator } from '../../containers/Navigator'
import './style.css'

const { Header, Footer } = Layout;

/**
 * @description Basic Layout with navigator & footer fixed
 *              deliver content with props.children
 * @class BasicLayout
 * @extends {Component}
 */
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