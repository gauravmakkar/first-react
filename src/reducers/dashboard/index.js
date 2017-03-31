/**
 * Created by gaurav.m on 3/31/17.
 */

import {FETCH_WIDGETS} from '../../constants/actionConstants'
const initialDashboardState = {widgets: [{name:"1"},{name:"2"}]}
export function DashboardReducers(state = initialDashboardState, action) {

    switch (action.type) {
        case FETCH_WIDGETS:
            return {...state}
        default:
            return state;
    }
}