import React, { Component } from 'react'
import { SheetMusicMid, SheetMusicMXL } from './components'

class SheetMusic extends Component {
    render() {
        return (
            <div>
                <div style={{ width: '80%', textAlign: 'center', margin: '16px', marginLeft: '90px' }}>
                    <SheetMusicMid />
                </div>
                <SheetMusicMXL src={this.props.mxlPath} />
            </div>
        )
    }
}

SheetMusic.defaultProps = {
    fileType: 'mid',
}

export default SheetMusic;