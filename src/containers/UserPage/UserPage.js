import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Avatar } from 'antd'

import ArticleList from '../ArticleList'
import { actions } from '../../modules/home';

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
                        description={this.props.userInfo.description}
                    />
                </Card>
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