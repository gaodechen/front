import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd';

const extraContent = (
  <img
    src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
    alt="content"
  />
);

const listData = [{
    avatar: 'http://localhost:3002/static/avatar/default_avatar.png',
    title: 'Article Title 1',
    description: 'Article Description 1',
    content: 'Here is an article. This is Musicine Music Page, which contains user info header, and an article list, try it now!.',
    thumbnail: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    likeNumber: 10,
}, {
    avatar: 'http://localhost:3002/static/avatar/default_avatar.png',
    title: 'Article Title 2',
    description: 'Article Description 2',
    content: 'Here is an article. This is Musicine Music Page, which contains user info header, and an article list, try it now!.',
    thumbnail: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    likeNumber: 2,
}, {
    avatar: 'http://localhost:3002/static/avatar/default_avatar.png',
    title: 'Article Title 3',
    description: 'Article Description 3',
    content: 'Here is an article. This is Musicine Music Page, which contains user info header, and an article list, try it now!.',
    thumbnail: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    likeNumber: 30,
}, {
    avatar: 'http://localhost:3002/static/avatar/default_avatar.png',
    title: 'Article Title 3',
    description: 'Article Description 3',
    content: 'Here is an article. This is Musicine Music Page, which contains user info header, and an article list, try it now!.',
    thumbnail: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
    likeNumber: 26,
}

]

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
            <div style={{margin: '16px 0', padding: '36px', border: '2px dashed #e9e9e9', backgroundColor: '#fafafa'}} >
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={listData}
                    footer={<div>文章列表</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText type="star-o" text={item.likeNumber} />,
                            ]}
                            extra={<img width={272} alt="logo" src={item.thumbnail}/>}
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