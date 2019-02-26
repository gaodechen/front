import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

export const MenuList = (items) => {
    return items.map((item) => MenuItem(item))
}

export const MenuItem = (item) => {
    return (
        <Menu.Item key={item.url}>
            <NavLink to={item.url}>
                <Icon type={item.iconType} />
                <span>{item.name}</span>
            </NavLink>
        </Menu.Item>
    )
}