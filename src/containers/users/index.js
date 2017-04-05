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
                "auth_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5OTksInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsib3BlbmlkIl0sImV4cCI6MTQ5MTQzNTU5MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiI2NzNmOTQ3My03YzUxLTQ4ODUtOGNiNy0yZjQxNmQyZmRhM2QiLCJjbGllbnRfaWQiOiJ3bXMifQ.B1JeqyLrJUVqTPlloHiBVp7qq_yvWwEym8s6p2rQyVcr86tNbKLwEleWlpYV6vcrdOnJ8EMd7gZJE9lihuxPV7YPha0jy6LChp4L20Cp_AeBeFuj-HFpfIKYjd5OulpcoaGRYp2zKRIe7UywfQfNve6cMZdLVMF3EsYzd1vZy3QZVIZzsuRGO812mYkhI5v9T_zUaDXhRjEscPSuQW6MnoupxULQq5mmDl55RwtlKD3Fjy-YlzW8Kr_JXkRIeOKAlIoenl2I2lMN4DZ0gajaW6IuhrMRGpwHWWse3LWiCeT4pXFDiS9SmdHeZkxBlHuV0yPPP93K6Jd05znF2__Rwg"
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
            <div className="settingsContainer container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="header row" style={{paddingLeft:0,paddingRight:0}}>
                            <div className="col-md-4 col-md-push-8"><h2>Users</h2></div>
                            <div className="col-md-8 col-md-pull-4 text-right"><input ref={(input) => { this.textInput = input; }} className="usernameSearchInput" onChange={this.handleOnChangeSearchBox} value={this.props.filter} type="text" placeholder="Search by username"
                                                                                      onKeyDown={this.filterUserList}/></div>

                        </div>

                        <table style={{width:"100%"}} className="table table-bordered">
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
                </div>
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
