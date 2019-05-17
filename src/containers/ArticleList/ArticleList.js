import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd';

import Player from 'react-aplayer'

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

/**
 * @description Article List based on <List /> component
 * @class ArticleList
 * @extends {Component}
 */
class ArticleList extends Component {
    render() {
        return (
            <div style={{ margin: '16px ', padding: '36px', border: '2px dashed #e9e9e9', backgroundColor: '#fafafa' }} >
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.props.articles}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            extra={<Player audio={item.audio} />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={'http://localhost:3002/static/avatar/default_avatar.png'} size="large" />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

ArticleList.defaultProps = {
    articles: [
        {
            title: '梁祝',
            description: "梁祝是一个凄凉优美的中国古代爱情故事",
            audio: {
                "name": "梁祝",
                "cover": "http://localhost:3002/static/thumbnail/梁祝.png",
                "refBegin": "70",
                "url": "http://localhost:3002/static/music/5-lz.mp3",
                "refEnd": "90"
            }
            ,
        },
    ]
}

export default ArticleList;