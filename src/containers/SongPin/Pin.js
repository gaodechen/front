import React, { Component } from 'react'
import { Icon, Card } from 'antd'

const Meta = Card.Meta;

/**
 * @description Unit square for song representation,
 *              containing thumbnail, song info, and play & like buttons
 *              play buttons clicked to show only climax part of song
 * @class Pin
 * @extends {Component}
 */
class Pin extends Component {
    onLike = () => {
        this.props.onLike(this.props.userId, this.props.musicID)
    }

    render() {
        return (
            <Card
                cover={
                    <img
                        style={{ objectFit: 'cover' }}
                        alt={this.props.pin.alt}
                        src={this.props.pin.src}
                        height='256px'
                    />
                }
                hoverable={true}
                actions={[
                    <Icon type="play-circle" />,
                    <Icon type="star" onClick={this.props.onLike} />
                ]}
                size="small"
                style={{width: '230px'}}
            >
                <Meta
                    title={this.props.pin.title}
                    description={this.props.pin.description}
                />
            </Card>
        )
    }
}

Pin.defaultProps = {
    pin: {
        alt: 'cover',
        src: 'http://127.0.0.1:3002/static/thumbnail/default_thumbnail.png',
    },
    width: 256,
    imgHeight: 256,
}

export default Pin