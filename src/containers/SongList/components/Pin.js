import React, { Component } from 'react'
import { Avatar, Icon, Card } from 'antd'
import { Link } from 'react-router-dom'

const Meta = Card.Meta;

class Pin extends Component {
    render() {
        return (
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt={this.props.alt}
                        src={this.props.coverSrc}
                    />
                }
                actions={[
                    <Icon type="play-circle" />,
                    <Icon type="star" onClick={this.props.onLike()} />
                ]}
            >
                <Meta
                    avatar={
                        <Avatar
                            src={this.props.avatarSrc}
                        />}
                    title={this.props.title}
                    description={this.props.description}
                />
            </Card>
        )
    }
}

Pin.defaultProps = {
    alt: 'cover',
    coverSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    avatarSrc: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    title: '歌曲名',
    description: '歌曲描述',
}

export default Pin