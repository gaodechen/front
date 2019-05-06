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
        const { sider, app } = this.props;
        if (sider === true) {
            const { menuItems } = this.props;
            return (
                <Layout className="content-layout-container">
                    <Col sm={{ span: 13 }}>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Col>
                    <Sider className="content-layout-sider" style={{ marginLeft: '32px' }}>
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
        } else if (app === false) {
            return (
                <Layout className="content-layout-container-single-col">
                    <Content className="content-layout-content-single-col">
                        {this.props.children}
                    </Content>
                </Layout>
            )
        } else {
            return (
                <Row className="flex-row">
                    {this.props.children}
                </Row>
            )
        }
    }
}

ContentLayout.defaultProps = {
    sider: true,
    app: false,
    menuItems: [
        { key: '0', iconType: 'edit', name: '文章创作', url: '/editor' },
        { key: '1', iconType: 'solution', name: '我的空间', url: '/space' },
        { key: '2', iconType: 'team', name: '好友动态', url: '/status' },
        { key: '3', iconType: 'eye', name: '我的关注', url: '/following' },
        { key: '4', iconType: 'star', name: '我的粉丝', url: '/followers' },
        { key: '5', iconType: 'eye', name: '我的收藏', url: '/collections' },
    ],
}

export default ContentLayout;