import React, { Component } from 'react'
import { Icon, Card } from 'antd'

const Meta = Card.Meta;

class Pin extends Component {
    onLike = () => {
        this.props.onLike(this.props.userID, this.props.musicID)
    }

    render() {
        return (
            <Card
                cover={
                    <img
                        style={{ objectFit: 'cover' }}
                        alt={this.props.pin.alt}
                        src={this.props.pin.coverSrc}
                    />
                }
                actions={[
                    <Icon type="play-circle" />,
                    <Icon type="star" onClick={this.props.onLike} />
                ]}
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
    },
    width: 300,
    imgHeight: 230,
}

export default Pin