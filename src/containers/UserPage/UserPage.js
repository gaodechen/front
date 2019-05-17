import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Avatar, Icon } from 'antd'

import ArticleList from '../ArticleList'
import { actions } from '../../modules/articles'
import { static_addr } from "../../config";

import './style.css'

const avatarPrefix = static_addr.AVATAR;

const routes = [{
    path: '/center/index',
    breadcrumbName: '我的关注',
}, {
    path: 'first',
    breadcrumbName: '我的粉丝',
}, {
    path: 'second',
    breadcrumbName: '我的首页',
}];

const { Meta } = Card;

class WrappedCenter extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.userInfo != this.props.userInfo) {
            const { _id } = nextProps.userInfo;
            this.props.getArticles(_id);
        }
    }

    handleEdit = () => {
        this.props.history.push('/editor');
    }

    getArticle = () => {
        const num = localStorage.getItem('num') || 0;
        let articles = [];
        for(var i = 0; i < num; i ++) {
            const articleStr = localStorage.getItem('a' + i);
            articles[i] = articleStr;
        }
        return articles;
    }

    render() {
        return (
            <div>
                <Card
                    actions={[
                        <Icon type="setting" />,
                        <Icon onClick={this.handleEdit} type="edit" />,
                        <Icon type="ellipsis" />
                    ]}
                >
                    <Meta
                        avatar={
                            <Avatar
                                src={avatarPrefix + this.props.userInfo.avatar}
                                shape="circle"
                                size="large"
                            />}
                        title={this.props.userInfo.username}
                        description={this.props.userInfo.description}
                    />
                </Card>
                <ArticleList />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
        articles: state.articles.articles,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticles: (id) => {
            dispatch(actions.getArticles(id));
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedCenter)
);