import React, { Component } from 'react'
import Player from 'react-aplayer'

class MusicPage extends Component {
    render() {
        return (
            <div>
                <Player
                    audio={{
                        ...this.props.audio
                    }} />
            </div>
        )
    }
}

export default MusicPage;