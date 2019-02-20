import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs, Icon } from 'antd'

import UserList from './UserList'
import { actions as homeActions } from '../../modules/home'

const TabPane = Tabs.TabPane;

class WrappedFriends extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" size="large" tabPosition="left">
                    <TabPane
                        tab={<span><Icon type="form" />我的空间</span>}
                        key="1"
                    >
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="team" />好友动态</span>}
                        key="2"
                    >
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="star" />我的关注</span>}
                        key="3"
                    >
                        <UserList dataSource={this.props.userInfo.following} />
                    </TabPane>
                    <TabPane
                        tab={<span><Icon type="like" />我的粉丝</span>}
                        key="4"
                    >
                        <UserList dataSource={this.props.userInfo.followers} />
                    </TabPane>
                </Tabs>
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
        getAuth: () => {
            dispatch(homeActions.userAuth())
        },
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(WrappedFriends)
);
