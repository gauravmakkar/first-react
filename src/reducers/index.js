/**
 * Created by gaurav.m on 3/31/17.
 */
import { combineReducers } from 'redux';
import { DashboardReducers } from './dashboard';
import { SettingsReducers } from './settings';
import { UsersReducer } from './users';
import { SocketReducers } from './socket';

//Add the list of reducers in combineReducers method

const rootReducer = combineReducers({
    dashboard:DashboardReducers,
    settings:SettingsReducers,
    users:UsersReducer,
    socket:SocketReducers
})

export default rootReducer