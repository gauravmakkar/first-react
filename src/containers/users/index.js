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
        this.textInput=null
    }


    componentDidMount(){
        this.setState({username:this.state.filter.username||''})
        if (!this.props.socket.connected) {
            console.log("Connecting to socket...")
            this.props.initWebSocket()
        }
        this.textInput.value=this.state.filter.username||""
    }

    componentDidUpdate(){
        console.log("COMPONENT UPDATED")
    }


    componentWillReceiveProps(nextProps) {
        let authenticationSocketData = {
            'type': 'auth',
            'data': {
                "auth_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5OTksInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsib3BlbmlkIl0sImV4cCI6MTQ5MTM0NDQ3MywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJkNTI2MmQxYi1iOTU3LTRlNWUtOGZkZS05ZmY4MTcyNzc1ZmEiLCJjbGllbnRfaWQiOiJ3bXMifQ.aA5ET1kZkQTA6V-Y4dzTKgodhD6-h7ZaGQKZIMHtB2XXik-UsFe84RpdPey_sZTUJZyYnCOjuBFUKUYHwjZC6tsBIzy_KisZHzT7wU1tJnLsnXaZCnhqfrZBXVVfA8Lc8HKewYRhUSAakC5tnuXmk3Bt-XmH1jMH_EgxxtQgZ4hych0jNoeD6YT33psNNb5-n-6uhfBQGJSpdJzVlYoWBVrjacBaIvYmEtIIiSkI9B68HVwPxQS-EmrUx9eb2bT3DCBFTj215ZsPvVIADs0o_XSiyLNFnOWH7zPXaiBIplIgzIaOamHrcyI64Vie3BqwY5Q9Mli-ziSUkFmxs6eD5g"
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
            if (event.target.value.length < 1) {
                this.context.router.push("users")
            } else {
                this.context.router.push("users?username=" + event.target.value)
            }


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
                        <input ref={(input) => { this.textInput = input; }} className="usernameSearchInput" onChange={this.handleOnChangeSearchBox} value={this.props.filter} type="text" placeholder="Search by username"
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
