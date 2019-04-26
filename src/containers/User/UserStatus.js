import React, { Component } from 'react'
import { connect } from 'react-redux';

// import { actions } from '../../modules/home'

/**
 * @description wrapped component with HOC
 * @param {*} WrappedComponent
 * @returns
 */
const UserStatusUpdate = WrappedComponent => {
    /**
     * @description update user status
     * @class HOC
     * @extends {Component}
     */
    class HOC extends Component {
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }

    const mapStateToProps = (state) => {
        return {
            login: state.home.isLoggedIn,
            userInfo: state.home.userInfo
        }
    }

    /* const mapDispatchToProps = (dispatch) => {
        return {
            getAuth: () => {
                dispatch(actions.userAuth())
            }
        }
    } */

    return connect(mapStateToProps)(HOC);
    // return connect(mapStateToProps, mapDispatchToProps)(HOC);
}

export default UserStatusUpdate;
