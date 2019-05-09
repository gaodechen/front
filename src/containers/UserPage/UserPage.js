import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Avatar } from 'antd'

import ArticleList from '../ArticleList'
import { actions } from '../../modules/home';
import { PageHeader,Typography } from 'antd';

import './style.css'

const { Paragraph } = Typography;

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

const content = (
    <div className="content">
        <Paragraph>
            I'm a music lover, though I know nothing about music theory.
        </Paragraph>
        <Paragraph>
            Musicine gives a chance to compose using create ideas instead of music theory.
            Also, I like to use transcription tool to record songs I love. I love Musicine!
        </Paragraph>
        <p className="contentLink">
            <a>
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
                    alt="start"
                />
                发现音乐
            </a>
            <a>
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
                    alt="info"
                />
                定制音乐页面
            </a>
            <a>
                <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                    alt="doc"
                />
                创作
            </a>
        </p>
    </div>
);

const extraContent = (
  <img
    src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
    alt="content"
  />
);


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
                                src='http://localhost:3002/static/avatar/default_avatar.png'
                                shape="circle"
                                size='large'
                            />}
                        title={this.props.userInfo.username}
                        description='我是音乐爱好者'
                    />
                </Card>
               <PageHeader title="Title" breadcrumb={{ routes }}>
    <div className="wrap">
      <div className="content">{content}</div>
      <div className="extraContent">{extraContent}</div>
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