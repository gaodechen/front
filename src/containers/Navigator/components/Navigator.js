import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Row, Col } from 'antd'

import { MenuList } from '../../../components/MenuItems'

// 一级导航菜单项
const mainMenus = [
    { url: '/music', name: '音乐', iconType: 'star' },
    { url: '/composition', name: '创作', iconType: 'copy' },
];

// guest可以访问的用户菜单(secondary)
const guestMenus = [
    // form是对应需要展示的modal表单名称
    { url: '/login', name: '登陆', iconType: 'login' },
    { url: '/register', name: '注册', iconType: 'user-add' }
]

// user可以访问的用户菜单(secondary)
const userMenus = [
    { url: '/center', name: '社区', iconType: 'team' },
    { url: '/logout', name: '注销', iconType: 'logout' },
]

class Navigator extends Component {
    render() {
        const { location, isLoggedIn, userInfo } = this.props;
        // 根据登陆状态渲染
        return (
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 18, offset: 3 }}>
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        theme="dark"
                        style={{ lineHeight: '64px' }}
                    >
                        {
                            // 渲染一级菜单
                            MenuList(mainMenus)
                        }
                        <Menu.SubMenu
                            title={<span><Icon type="user" />{isLoggedIn ? userInfo.username : "用户"}</span>}
                        >
                            {
                                isLoggedIn
                                    // 登陆后调用用户菜单
                                    ?
                                    MenuList(userMenus)
                                    // 游客面板
                                    :
                                    MenuList(guestMenus)
                            }
                        </Menu.SubMenu>
                    </Menu>
                </Col>
            </Row>
        )
    }
}

export default Navigator