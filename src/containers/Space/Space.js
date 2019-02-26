import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ContentLayout } from '../../components/Layouts';

class WrappedSpace extends Component {
    render() {
        return (
            <ContentLayout>
            Space
            </ContentLayout>
        )
    }
}

export default withRouter(
    connect()(WrappedSpace)
);
