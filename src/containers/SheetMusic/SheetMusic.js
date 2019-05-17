import React, { Component } from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'

import { SheetMusicMXL } from './components'

class SheetMusic extends Component {
    componentDidMount() {
        if(this.props.mxlPath) {
            message.success('正在渲染乐谱...')
        } else {
            message.error('乐谱无效')
        }
    }
    render() {
        if(this.props.mxlPath) {
            return (
                <div style={{width: '80%', textAlign: 'center', marginLeft: '90px'}}>
                    <SheetMusicMXL file={this.props.mxlPath}/>
                </div>
            )
        }
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        mxlPath: state.transcription.musicXml,
        // mxlPath: 'http://47.99.83.172/files/download?name=xml/2019-05-15 18:05:08.217234.xml',
        // mxlPath: 'http://localhost:3002/static/temp.xml',
    }
}

export default connect(mapStateToProps)(SheetMusic);