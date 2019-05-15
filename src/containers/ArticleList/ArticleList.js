import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd';

const listData = [{
    avatar: 'http://localhost:3002/static/articleThumbnail/default_thumbnail.jpg',
    title: 'Article Title',
    description: 'Article Description',
    content: 'Here is an article.',
    thumbnail: 'http://localhost:3002/static/articleThumbnail/logo3.0.jpg',
}]

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
            <div style={{margin: '16px ',padding: '36px', border: '2px dashed #e9e9e9', backgroundColor: '#fafafa'}} >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                    },
                    pageSize: 3,
                }}
                dataSource={listData}
                footer={<div>文章列表</div>}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="logo" src=""/>}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} size="large" />}
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

}

export default ArticleList;