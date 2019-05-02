import React, { Component } from 'react'
import { Card } from 'antd'

/**
 * @description StyleCard shows meta and thumbnail of one style
 * @class StyleCard
 * @extends {Component}
 */
class StyleCard extends Component {
    render() {
        const { Meta } = Card;
        const { title, description, src, alt} = this.props;
        return (
            <div>
                <Card
                    hoverable
                    cover={<img alt={alt} src={src} />}
                >
                    <Meta
                        title={title}
                        description={description}
                    />
                </Card>
            </div>
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