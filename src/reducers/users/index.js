/**
 * Created by gaurav.m on 4/3/17.
 */
import {RECIEVE_USER_LIST} from '../../constants/actionConstants';

export  function UsersReducer(state={},action){
    switch (action.type) {
        case RECIEVE_USER_LIST:
            let receivedList = action.data.complete_data;
            return {...state,receivedList}

        default:
            return state;
    }
}