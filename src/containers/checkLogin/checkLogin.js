import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class WrappedCheckLogin extends Component {
    render() {
        // trueUrl: 登陆时的Redirect地址
        // falseUrl: 未登录时的Redirect地址
        const { userInfo, trueUrl, falseUrl } = this.props;

        let redirect;
        if (userInfo) {
            redirect = (<Redirect push to={trueUrl} />);
        } else {
            redirect = (<Redirect push to={falseUrl} />);
        }
        return redirect;
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo,
    }
}

const CheckLogin = connect(mapStateToProps, null)(withRouter(WrappedCheckLogin))

export default CheckLogin