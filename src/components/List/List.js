// 列表组件
import React, { Component } from 'react'
import { List, Avatar, Icon } from 'antd'

const listData = [];

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

// props: function itemize, array items
class ListComponent extends Component {
    render() {
        const { dataSource, renderItem, ...rest } = this.props;
        return (
            <div>
                <List
                    dataSource={dataSource}
                    pagination={{
                        onChange: (page) => {
                            console.log(page)
                        },
                        pageSize: 3,
                    }}
                    renderItem={renderItem}
                    {...rest}
                />
            </div>
        )
    }
}

ListComponent.defaultProps = {
    itemLayout: "vertical",
    size: "large",
    // footer: (<div> <b>ant design</b> footer part</div>)
    renderItem: item => (
        <List.Item
            key={item.title}
            actions={[
                <IconText type="star-o" text="156" />,
                <IconText type="like-o" text="156" />,
                <IconText type="message" text="2" />
            ]}
            extra={
                <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
            }
        >
            <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
            />
            {item.content}
        </List.Item>)
}

export default ListComponent;