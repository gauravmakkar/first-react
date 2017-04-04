/**
 * Created by gaurav.m on 4/3/17.
 */
import {WS_DISCONNECT,WS_CONNECTED,WS_ONMESSAGE,WS_END,DATA_SUBSCRIPTION_PACKET} from '../../constants/actionConstants'
import {receiveUserList} from '../../actions/users'
var socket = null;
export function wsOnMessageAction(data){

    return{
        type:WS_ONMESSAGE,
        data
    }
}
export function wsResponseAction(data){
console.log("wsResponseAction")
    return{
        type:WS_CONNECTED,
        data
    }
}
export function setWsAction(params){
    return {
        type: params.type,
        data: params.data
    }
}
export function endWsAction()
{
    return { type: WS_DISCONNECT }
}
export function wsEndConnection()
{
    return {
        type:WS_END
    }
}
export function setMockAction(params){
    return {
        type: params.type,
        data: params.data
    }
}

export function updateSubscriptionPacket(data){
    return {
        type: DATA_SUBSCRIPTION_PACKET,
        data
    }
}

