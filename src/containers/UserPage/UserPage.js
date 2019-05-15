import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Avatar, PageHeader } from 'antd'

import ArticleList from '../ArticleList'
import { actions } from '../../modules/home';

import './style.css'

const routes = [
    {
        path: 'index',
        breadcrumbName: '我的关注',
    },
    {
        path: 'first',
        breadcrumbName: '我的粉丝',
    },
    {
        path: 'second',
        breadcrumbName: '我的首页',
    },
];

const { Meta } = Card;

class WrappedCenter extends Component {
    componentDidMount() {
        const { params } = this.props.match;
        this.props.getUserInfo(params);
    }

    render() {
        return (
            <div>
                <Card>
                    <Meta
                        avatar={
                            <Avatar
                                src={this.props.userInfo.avatar}
                                shape="circle"
                                size='large'
                            />}
                        title={this.props.userInfo.username}
                    />
                </Card>
                <PageHeader title="Title" breadcrumb={{ routes }}>
                    <div className="wrap">
                        <div className="content">{this.props.userInfo.description}</div>
                    </div>
                </PageHeader>
                <ArticleList userID={this.props.userInfo._id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: (id) => {
            dispatch(actions.getUserInfo(id));
        }
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedCenter)
);