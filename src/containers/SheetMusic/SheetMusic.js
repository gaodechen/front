import React, { Component } from 'react'
import SheetMusicRenderer from './components'
import { addr_config } from '../../config'

class SheetMusic extends Component {
    render() {
        return (
            <SheetMusicRenderer file={this.props.mxlPath} />
        );
    }
}

SheetMusic.defaultProps = {
    mxlPath: addr_config.STATIC_HOST + '/temp.mxl',
}

export default SheetMusic;