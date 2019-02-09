import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../modules/home'
import { Tip } from '../message'

class Logout extends Component {
    componentWillMount() {
        // 注销
        this.props.handleLogout();
    }

    render() {
        const type = this.props.msg.type
        const tipContent = this.props.msg.content
        const tipType = type ? "success" : "error"
        const tipTitle = "提示"
        return (
            <div>
                {
                    Tip(tipType, tipTitle, tipContent)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        msg: state.home.msg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogout: () => {
            dispatch(actions.userLogout())
        }
    }
}

const WrappedLogout = connect(mapStateToProps, mapDispatchToProps)(Logout)

export default WrappedLogout