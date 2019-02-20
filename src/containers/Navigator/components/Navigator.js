import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import { Row, Col } from 'antd'

import { mainMenus, guestMenus, userMenus } from './MenuItems'
// import { logo } from '../../../config'

const MenuItem = (item) => {
    return (
        <Menu.Item key={item.url}>
            <NavLink to={item.url}>
                <Icon type={item.iconType} />
                <span>{item.name}</span>
            </NavLink>
        </Menu.Item>
    )
}

const MenuList = (items) => {
    return items.map((item) => MenuItem(item))
}

class Navigator extends Component {
    render() {
        const { location, isLoggedIn, userInfo } = this.props;
        // 根据登陆状态渲染
        return (
            <Row>
                <Col xs={{ span: 0 }} sm={{ span: 3 }} />
                <Col xs={{ span: 24 }} sm={{ span: 20 }} >
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