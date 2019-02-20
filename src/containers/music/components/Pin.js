import React, { Component } from 'react'
import MusicPlayer from 'music-player'
import "music-player/assets/index.css"



class Pin extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <MusicPlayer />
        )
    }
}

export default Pin