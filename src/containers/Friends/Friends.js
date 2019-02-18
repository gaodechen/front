import React, { Component } from 'react';
import { connect } from 'react-redux'

import { List } from '../../components/List'
import { actions as friendsActions } from '../../modules/friends'

// User Panel
// Tab: Follows

class WrappedFriends extends Component {
    render() {
        return (
            <div>
                <List dataSource={this.props.userInfo.following} />
                <List dataSource={this.props.userInfo.followers} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.home.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (listName, id) => {
            dispatch(friendsActions.getList(listName, id))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(WrappedFriends);