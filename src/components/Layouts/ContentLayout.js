// Content局部布局
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Col } from 'antd'

import { MenuList } from '../MenuItems'

const { Sider, Content } = Layout;

class ContentLayout extends Component {
    render() {
        const { sider = true } = this.props;
        // 是否具有右侧导航菜单
        if (sider) {
            const { menuItems } = this.props;
            return (
                <Layout className="content-layout-container">
                    <Col sm={{ span: 13 }}>
                        <Content className="content-layout-content">
                            {this.props.children}
                        </Content>
                    </Col>
                    <Sider className="content-layout-sider" style={{marginLeft: '32px'}}>
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
        } else {
            return (
                <Layout className="content-layout-container-full">
                    <Content className="content-layout-content-full">
                        {this.props.children}
                    </Content>
                </Layout>
            )
        }
    }
}

ContentLayout.defaultProps = {
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