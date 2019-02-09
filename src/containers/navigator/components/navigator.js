import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'

import { mainMenus, guestMenus, userMenus } from './menuItems'

const MenuItem = (item) => {
    return (
        <Menu.Item key={item.url} onClick={item.onClick}>
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
        const { url, userInfo, showForm } = this.props;
        // 巧妙!
        guestMenus.map((item) => ({...item, onClick: showForm(item.form)}))
        // 根据登陆状态渲染
        return (
            <Menu mode="horizontal" selectedKeys={url} theme="dark">
                {
                    // 渲染一级菜单
                    MenuList(mainMenus)
                }
                <Menu.SubMenu title={<span><Icon type="setting" />用户</span>}>
                    {
                        userInfo
                            // 登陆后调用用户菜单
                            ?
                            MenuList(userMenus)
                            // 游客面板
                            :
                            MenuList(guestMenus)
                    }
                </Menu.SubMenu>
            </Menu>
        )
    }
}

export default Navigator