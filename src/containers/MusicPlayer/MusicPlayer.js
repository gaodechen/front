import React, { Component } from 'react'
import Player from 'react-aplayer'

class MusicPlayer extends Component {
    // event binding example
    onPlay = () => {
        console.log('on play');
    };

    onPause = () => {
        console.log('on pause');
    };

    // example of access aplayer instance
    onInit = ap => {
        this.ap = ap;
    };

    render() {
        const props = {
            theme: '#F57F17',
            lrcType: 3,
            audio: [{
                url: 'http://localhost:3002/static/music/Lemon.mp3',
                theme: '#ebd0c2',
            }]
        };

        return (
            <div>
                <Player
                    {...props}
                    onInit={this.onInit}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                />
            </div>
        );
    }
}

export default MusicPlayer;