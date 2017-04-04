/**
 * Created by gaurav.m on 4/3/17.
 */
import React, {Component, PropTypes} from 'react';
import './users.css';
import {connect} from 'react-redux'
import {fetchUserList} from '../../actions/users';
import {setWsAction} from '../../actions/socket';
import {WS_CONNECT, WS_ONSEND} from '../../constants/actionConstants';
import {userSubscriber} from './subscribe'
import {browserHistory} from 'react-router';

class UsersContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {filter: props.location.query}
        this.filterUserList = this.filterUserList.bind(this)
        this.handleOnChangeSearchBox = this.handleOnChangeSearchBox.bind(this)
    }

    componentWillMount() {
        this.setState({username:this.state.filter.username||''})
        if (!this.props.socket.connected) {
            console.log("Connecting to socket...")
            this.props.initWebSocket()
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("CALLED")
        let authenticationSocketData = {
            'type': 'auth',
            'data': {
                "auth_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5OTksInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsib3BlbmlkIl0sImV4cCI6MTQ5MTMyNjYxNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJlNzU2ODY5MS1jYTU4LTQ1NzItOTEyMy00YWVjYjVhYzU0MzciLCJjbGllbnRfaWQiOiJ3bXMifQ.DnRNsyKuzgua6OHIavp25ARcH7kg8_ypRyqRC91xziPaj92L2fYbXaQ-C8pY067B2Mj67W7KG04tLXqVlP1ax-srbNLrJSEupOeTSKMTgh1hlhm3YbYfkQwXlsIy8iKq6ylA68w9Ckhs9DPV2-FNtraP71DCxBFn9PW3Y3gNoT4yCJngxGfL3Lal7NqMJAwIZv9jcZ_QpiLUSDom4eNs3NLtxIQf_aG9Jm4Tm5U60whCRgaw9bNSzifA_yluRgAQXnZ1foVpGUhPH1fOgowXbpMODHQSeliTV4IgCJMqExAJetu6f4vXVaB2QI-5brA-rDqxi2n0FubbnJlW4Ah3Hw"
            }
        }
        if (nextProps.socket.connected && !nextProps.socket.authenticated) {
            console.log("SENDING AUTH")
            this.props.sendAuthToSocket(authenticationSocketData)
        }

        if (nextProps.socket.connected && nextProps.socket.authenticated && !nextProps.socket.subscribed) {
            console.log("Subscribing User Data")
            let filteredUserSubsriberData = userSubscriber["users"]
            if (this.state.filter && this.state.filter.username) {
                filteredUserSubsriberData.data[0].details["filter_params"] = {'user_name': ['contains', this.state.filter.username]}
            }
            this.props.initDataSentCall(filteredUserSubsriberData);
        }

        if (nextProps.location.query && this.state.filter && nextProps.location.query.username !== this.state.filter.username) {
            let filteredUserSubsriberData = userSubscriber["users"]
            if (nextProps.location.query.username) {
                filteredUserSubsriberData.data[0].details["filter_params"] = {'user_name': ['contains', nextProps.location.query.username]}
                this.setState({filter: nextProps.location.query})
            }else{
                filteredUserSubsriberData.data[0].details["filter_params"] = {'user_name': ['contains', ""]}
                this.setState({filter: {username:""}})
            }
            this.props.initDataSentCall(filteredUserSubsriberData);

        }
    }

    filterUserList(event) {

        if (event.keyCode === 13) {
                this.context.router.push("users?username=" + event.target.value)

        }
    }

    handleOnChangeSearchBox(event) {
        this.setState({username: event.target.value})
    }

    render() {
        return (
            <div className="settingsContainer">
                <div className="header">
                    <div style={{float:'left',clear:'both'}}>
                        <h2>Users</h2>
                    </div>
                    <div style={{float:'right',marginTop:'10px'}}>
                        <input className="usernameSearchInput" onChange={this.handleOnChangeSearchBox} value={this.props.username} type="text" placeholder="Search by username"
                               onKeyDown={this.filterUserList}/>
                    </div>
                </div>

                <table style={{'width': '100%'}}>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.users ? this.props.users.map(function (user, index) {
                        return ( <tr key={index}>
                            <td>{user.user_name}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.role}</td>
                        </tr>)
                    }) : <tr>
                        <td colSpan={'4'}>Loading...</td>
                    </tr>}
                    </tbody>
                </table>

            </div>
        );
    }
}

UsersContainer.contextTypes = {
    router: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    console.log(state)
    return {
        users: state.users.receivedList,
        socket: state.socket,
        filter: state.username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserList: function (data) {
            dispatch(fetchUserList(data));
        },
        initWebSocket: function () {
            dispatch(setWsAction({type: WS_CONNECT}));
        },
        sendAuthToSocket: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
        initDataSentCall: function (data) {
            dispatch(setWsAction({type: WS_ONSEND, data: data}));
        },
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
