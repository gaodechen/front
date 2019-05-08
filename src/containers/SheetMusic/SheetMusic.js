import React, { Component } from 'react'
import { SheetMusicMid, SheetMusicMXL } from './components'
import { addr_config } from '../../config'

class SheetMusic extends Component {
    render() {
        return (
            <div>
                <div style={{ width: '80%', textAlign: 'center', margin: '16px', marginLeft: '90px' }}>
                    <SheetMusicMid />
                </div>
                <img src={this.props.imgPath} />
            </div>
        )
    }
}

SheetMusic.defaultProps = {
    fileType: 'mid',
    mxlPath: 'http://localhost:3002/static/temp.mxl',
    midPath: addr_config.STATIC_HOST + '/temp.mid',
    imgPath: 'http://localhost:3002/static/temp.png'
}

export default SheetMusic;