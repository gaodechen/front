import React, { Component } from 'react'
import { Card } from 'antd'

import './style.css'

/**
 * @description StyleCard shows meta and thumbnail of one style
 * @class StyleCard
 * @extends {Component}
 */
class StyleCard extends Component {
    render() {
        const { Meta } = Card;
        const { title, description, src, alt } = this.props;
        return (
            <Card
                hoverable
                cover={<img alt={alt} src={src} />}
                onClick={this.props.setTargetStyle}
            >
                <Meta
                    title={title}
                    description={description}
                />
            </Card>
        )
    }
}

StyleCard.defaultProps = {
    title: '',
    descritpion: '',
    src: '',
    alt: 'style card',
}

export default StyleCard