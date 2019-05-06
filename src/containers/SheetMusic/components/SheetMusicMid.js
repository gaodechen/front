import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import abcjs from "abcjs/midi";
import './style.css'

class SheetMusicMid extends PureComponent {
    uniqueNumber = Date.now() + Math.random()

    renderAbcNotation(abcNotation, parserParams, midiParams, renderParams) {
        const res = abcjs.renderMidi(
            'abcjs-result-' + this.uniqueNumber,
            abcNotation,
            parserParams,
            midiParams,
            renderParams
        )
        return res;
    }

    componentDidMount() {
        const {
            abcNotation,
            parserParams,
            midiParams,
            renderParams
        } = this.props
        this.renderAbcNotation(
            abcNotation,
            parserParams,
            midiParams,
            renderParams
        )
    }

    componentWillReceiveProps(nextProps) {
        const {
            abcNotation,
            parserParams,
            midiParams,
            renderParams
        } = nextProps
        this.renderAbcNotation(
            abcNotation,
            parserParams,
            midiParams,
            renderParams
        )
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <div
                    id={'abcjs-result-' + this.uniqueNumber}
                    style={{ width: '100%' }}
                />
            </div>
        )
    }
}

SheetMusicMid.propTypes = {
    abcNotation: PropTypes.string,
    parserParams: PropTypes.object,
    midiParams: PropTypes.object,
    renderParams: PropTypes.object
}

SheetMusicMid.defaultProps = {
    abcNotation: 'X:1\nT:Example\nM:4/4\nC:Trad.\nK:G\n|:Gccc dedB|dedB dedB|c2ec B2dB|c2A2 A2BA|',
    parserParams: {},
    midiParams: { responsive: 'resize' },
    renderParams: { viewportHorizontal: true }
}

export default SheetMusicMid;