import React, { Component } from 'react'
import { SheetMusicMid, SheetMusicMXL } from './components'
import { addr_config } from '../../config'

class SheetMusic extends Component {
    render() {
            return (
                <SheetMusicMid abcNotation={
                    'X:1\nT:Example\nM:4/4\nC:Trad.\nK:G\n|:Gccc dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|'
                }
                    parserParams={{}}
                    engraverParams={{ responsive: 'resize' }}
                    renderParams={{ viewportHorizontal: true }}
                />
            )
    }
}

SheetMusic.defaultProps = {
    mxlPath: addr_config.STATIC_HOST + '/temp.mxl',
    midPath: addr_config.STATIC_HOST + '/temp.mid',
}

export default SheetMusic;