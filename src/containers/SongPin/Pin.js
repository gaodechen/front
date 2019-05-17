import React, { Component } from 'react'
import { Icon, Card } from 'antd'

import Player from 'react-aplayer'

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

    onInit = ap => {
        this.ap = ap;
    }

    onPlay = () => {
        this.ap.seek(this.props.audio.refBegin);
    }

    render() {
        return (
            <Player
                onInit={this.onInit}
                onPlay={this.onPlay}
                audio={{ ...this.props.audio }}
            />
        )
    }
}

export default Pin