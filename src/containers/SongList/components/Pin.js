import React, { Component } from 'react'
import { Avatar, Icon, Card } from 'antd'

const Meta = Card.Meta;

class Pin extends Component {
    render() {
        return (
            <Card
                style={{ width: 300 }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="play-circle"/>, <Icon type="star"/>]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        )
    }
}

export default Pin