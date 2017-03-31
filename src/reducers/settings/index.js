/**
 * Created by gaurav.m on 3/31/17.
 */
import {FETCH_DEFAULT_SETTINGS} from '../../constants/actionConstants'
const initialSettingsState = {serverUrl:"https://github.com/gauravmakkar",extras:[]}
export function SettingsReducers(state = initialSettingsState, action) {

    switch (action.type) {
        case FETCH_DEFAULT_SETTINGS:
            return {...state}
        default:
            return state;
    }
}