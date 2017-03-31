/**
 * Created by gaurav.m on 3/31/17.
 */

import {FETCH_WIDGETS} from '../../constants/actionConstants'
const initialDashboardState = {widgets: []}
export function DashboardReducers(state = initialDashboardState, action) {

    switch (action.type) {
        case FETCH_WIDGETS:
            return {...state}
        default:
            return state;
    }
}