/**
 * Created by gaurav.m on 3/31/17.
 */
import { combineReducers } from 'redux';
import { DashboardReducers } from './dashboard';

//Add the list of reducers in combineReducers method

const rootReducer = combineReducers({
    dashboard:DashboardReducers
})

export default rootReducer