import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ContentLayout } from '../../components/Layouts';

class WrappedCenter extends Component {
    render() {
        return (
            <ContentLayout>
            Center
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
