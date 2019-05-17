import React, { Component } from 'react'
import MidiPlayer from 'midi-player-js'
import axios from 'axios'

import './midi.js'

class ReactMidiPlayer extends Component {
    async componentDidMount() {
    }

    render() {
        return (
            <div>
                <a href="#" onClick="MIDIjs.play('http://localhost:3002/static/temp.mid');">Play hinematov.mid</a>
            </div>
        )
    }
}

export default ReactMidiPlayer;