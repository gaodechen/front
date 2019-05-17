import React, { Component } from 'react'
import { Row } from 'antd'

import SongPinList from '../SongPinList'
import { ContentLayout } from '../../components/Layouts'

class AlbumPage extends Component {
    render() {
        return (
            <ContentLayout sider={false} pageApp>
                <Row>
                    <div className="music-page-content">
                        {this.props.description}
                    </div>
                </Row>
                <Row>
                    <div className="music-page-content">
                        <SongPinList row={1} col={1} songList={this.props.songList} />
                    </div>
                </Row>
            </ContentLayout>
        )
    }
}

AlbumPage.defaultProps = {
    description: '梁祝是一个凄凉优美的中国古代爱情故事',
    songList: [
    {
        "name": "梁祝",
        "cover": "http://localhost:3002/static/thumbnail/梁祝.png",
        "refBegin": "70",
        "url": "http://localhost:3002/static/music/5-lz.mp3",
        "refEnd": "90"
    },
    ]
}

export default AlbumPage;