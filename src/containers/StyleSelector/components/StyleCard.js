import React, { Component } from 'react'
import { Card, message } from 'antd'

import './style.css'

/**
 * @description StyleCard shows meta and thumbnail of one style
 * @class StyleCard
 * @extends {Component}
 */
class StyleCard extends Component {
    handleClick = () => {
        message.success('您选择的风格是：' + this.props.title);
    }

    render() {
        const { Meta } = Card;
        const { title, description, src, alt } = this.props;
        return (
            <Card
                hoverable
                cover={<img alt={alt} src={src} />}
                onClick={this.handleClick}
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