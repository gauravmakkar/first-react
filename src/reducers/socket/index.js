/**
 * Created by gaurav.m on 4/3/17.
 */
import {WS_CONNECTED,WS_ONMESSAGE,WS_END, DATA_SUBSCRIPTION_PACKET,WS_AUTHENTICATED,WS_SUBSCRIBED} from '../../constants/actionConstants';


/**
 * @param  {State Object}
 * @param  {Action object}
 * @return {[Object] updated state}
 */
export  function SocketReducers(state={connected:false,authenticated:false},action){
    switch (action.type) {

        case WS_CONNECTED:
            let socket=Object.assign({}, state, {
                "connected": true

            })
            return socket

        case WS_AUTHENTICATED:
            return Object.assign({},state,{
                authenticated:true
            })

        case WS_SUBSCRIBED:
             return Object.assign({},state,{
            subscribed:true
        })
        case WS_END:

            return Object.assign({}, state, {
                "connected": false,
                "authenticated": false,
                "initDataSent":false
            })
            break;
        case WS_ONMESSAGE:
            // Handshaking and login successful message.
            return Object.assign({}, state, {
                "authenticated": true,
                "initDataSent":true
            })
            break;

        case DATA_SUBSCRIPTION_PACKET:
            return Object.assign({}, state, {
                "socketDataSubscriptionPacket":action.data
            })
            break;

        default:
            return state
    }
}