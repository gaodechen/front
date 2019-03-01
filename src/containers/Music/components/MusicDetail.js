// 音乐详情页面
import React, { Component } from 'react'

class MusicDetail extends Component {
    render() {
        const { musicInfo } = this.props;
        return (
            <div>
                {musicInfo.title}
                <div>
                {musicInfo.lyric}
                </div>
            </div>
        )
    }
}

MusicDetail.defaultProps = {
    musicInfo: {
        title: '贝多芬《交响曲》'
    }
}

export default MusicDetail;