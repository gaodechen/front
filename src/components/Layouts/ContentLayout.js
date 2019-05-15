import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';

import { MenuList } from '../MenuItems'

const { Sider, Content } = Layout;

/**
 * @description Layout for content needed sider
 * @class ContentLayout
 * @props {bool} sider: display sidebar when sider = true
 * @props {array} menuItems: menuItems to be displayed when sider = true
 * @props {bool} app: display on the middle of screen when app = true,
 *                    otherwise show a default content layout
 * @extends {Component}
 */
class ContentLayout extends Component {
    /**
     * Kinds of Content-Layout:
     * 1. double cols including sidebar on the right
     * 2. single col content & cetered display
     * 3. single col content & from top to bottom displaying
     */
    render() {
        const { sider, pageApp, normalApp } = this.props;
        if (sider) {
            const { menuItems } = this.props;
            return (
                <Layout className="content-layout-container">
                    <Col sm={{ span: 13 }}>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Col>
                    <Sider className="content-layout-sider" style={{ marginLeft: '32px' }} >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {MenuList(menuItems)}
                        </Menu>
                    </Sider>
                </Layout>
            );
        }
        if (pageApp) {
            return (
                <Row className="full-page-app">
                    {this.props.children}
                </Row>
            )
        }
        if (normalApp) {
            return (
                <Row className="normal-app">
                    {this.props.children}
                </Row>
            )
        }
        return (
            <Layout className="content-layout-container-single-col">
                <Content className="content-layout-content-single-col">
                    {this.props.children}
                </Content>
            </Layout>
        )
    }
}

ContentLayout.defaultProps = {
    sider: true,
    app: false,
    menuItems: [
        { key: '0', iconType: 'edit', name: 'Introduction', url: '/editor' },
        { key: '1', iconType: 'solution', name: 'Another Introduction', url: '/space' },
        { key: '2', iconType: 'team', name: 'Album List', url: '/status' },
    ],
}

export default ContentLayout;