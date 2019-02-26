// HOC: 为组件注入用户登陆态
import React, { Component } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../modules/home'

// 为组件添加登陆态更新维护逻辑的高阶组件
const UserStatusUpdate = WrappedComponent => {
    class HOC extends Component {
        // 渲染之前进行一次登陆态查询更新
        /* componentDidMount() {
            const { login, userInfo } = this.props;
            if (!login || (login && Object.keys(userInfo).length === 0)) {
                this.props.getAuth();
            }
        } */

        render() {
            return (
                <WrappedComponent {...this.props}/>
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            login: state.home.isLoggedIn,
            userInfo: state.home.userInfo
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            getAuth: () => {
                dispatch(actions.userAuth())
            }
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(HOC);
}

export default UserStatusUpdate;
