import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { UserPage } from '../UserPage'
import { ContentLayout } from '../../components/Layouts';

/**
 * @description User Center
 * @class WrappedCenter
 * @extends {Component}
 */
class WrappedCenter extends Component {
    render() {
        return (
            <ContentLayout sider={false} app={false}>
                <UserPage />
            </ContentLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
    }
}

export default withRouter(
    connect(mapStateToProps)(WrappedCenter)
);
