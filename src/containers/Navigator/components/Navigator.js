import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Row, Col } from 'antd'

import { MenuList, MenuItem } from '../../../components/MenuItems'

// first class menu
const mainMenus = [
    { url: '/', name: '首页', iconType: 'star' },
    { url: '/styleTransfer/fileSelector', name: '风格迁移', iconType: 'copy' },
    { url: '/transcription/fileSelector', name: '旋律提取', iconType: 'file-text' },
    { url: '/midi2sheet/fileSelector', name: '乐谱生成', iconType: 'snippets' },
    { url: '/about', name: '关于', iconType: 'bulb' }
];

// secondary menu for guest
const guestMenus = [
    { url: '/login', name: '登陆', iconType: 'login' },
    { url: '/register', name: '注册', iconType: 'user-add' }
]

// secondary menu for users logged in
const userMenus = [
    { url: '/center', name: '空间', iconType: 'team' },
    { url: '/setting', name: '设置', iconType: 'setting' },
    { url: '/logout', name: '注销', iconType: 'logout' },
]

/**
 * @description default navigator
 * @class Navigator
 * @extends {Component}
 */
class Navigator extends Component {
    render() {
        const { location, isLoggedIn, userInfo } = this.props;
        // render differents items for users / guests
        return (
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 18, offset: 3 }}>
                    <Menu
                        mode="horizontal"
                        theme="dark"
                        selectedKeys={[location.pathname]}
                        style={{ lineHeight: '64px' }}
                    >
                        {MenuItem(mainMenus[0])}
                        <Menu.SubMenu
                            title={<span><Icon type="edit" />创作</span>}
                        >
                            {MenuItem(mainMenus[1])}
                            {MenuItem(mainMenus[2])}
                            {MenuItem(mainMenus[3])}
                        </Menu.SubMenu>
                        {MenuItem(mainMenus[4])}
                        <Menu.SubMenu
                            title={<span><Icon type="user" />{isLoggedIn ? userInfo.username : "用户"}</span>}
                        >
                            {
                                isLoggedIn
                                    // has logged in
                                    ?
                                    MenuList(userMenus)
                                    // not logged in
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