/**
 * Created by gaurav.m on 4/3/17.
 */
import { FETCH_USER_LIST,RECIEVE_USER_LIST} from '../../constants/actionConstants'

export function fetchUserList(){
    var promise = new Promise(function(resolve,reject) {
        let request = new XMLHttpRequest()
        request.open("GET", "https://192.168.8.109/api/user/role")
        request.onload = function(){
            if (request.status >= 200 && request.status < 300){
                var response = JSON.parse(request.response,request.status);
                resolve(response);
            }
            else {
                reject(request.statusText);
            }
        };
        request.setRequestHeader('Content-Type', "application/json");
        request.setRequestHeader('Accept', "application/json");
        request.setRequestHeader('Authentication-Token', "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5OTksInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsib3BlbmlkIl0sImV4cCI6MTQ5MTMyNjYxNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJlNzU2ODY5MS1jYTU4LTQ1NzItOTEyMy00YWVjYjVhYzU0MzciLCJjbGllbnRfaWQiOiJ3bXMifQ.DnRNsyKuzgua6OHIavp25ARcH7kg8_ypRyqRC91xziPaj92L2fYbXaQ-C8pY067B2Mj67W7KG04tLXqVlP1ax-srbNLrJSEupOeTSKMTgh1hlhm3YbYfkQwXlsIy8iKq6ylA68w9Ckhs9DPV2-FNtraP71DCxBFn9PW3Y3gNoT4yCJngxGfL3Lal7NqMJAwIZv9jcZ_QpiLUSDom4eNs3NLtxIQf_aG9Jm4Tm5U60whCRgaw9bNSzifA_yluRgAQXnZ1foVpGUhPH1fOgowXbpMODHQSeliTV4IgCJMqExAJetu6f4vXVaB2QI-5brA-rDqxi2n0FubbnJlW4Ah3Hw");
        request.send();


    })
    return dispatch => {
        return (promise).then(response => {
            dispatch(receiveUserList(response));
        }).catch(response => console.log("ERROR"));
    }
}

export function fetchUserListFromSocket(){
    var promise = new Promise(function(resolve,reject) {
        let request = new XMLHttpRequest()
        request.open("GET", "https://192.168.8.109/api/user/role")
        request.onload = function(){
            if (request.status >= 200 && request.status < 300){
                var response = JSON.parse(request.response,request.status);
                resolve(response);
            }
            else {
                reject(request.statusText);
            }
        };
        request.setRequestHeader('Content-Type', "application/json");
        request.setRequestHeader('Accept', "application/json");
        request.setRequestHeader('Authentication-Token', "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5OTksInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsib3BlbmlkIl0sImV4cCI6MTQ5MTMyNjYxNSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdLCJqdGkiOiJlNzU2ODY5MS1jYTU4LTQ1NzItOTEyMy00YWVjYjVhYzU0MzciLCJjbGllbnRfaWQiOiJ3bXMifQ.DnRNsyKuzgua6OHIavp25ARcH7kg8_ypRyqRC91xziPaj92L2fYbXaQ-C8pY067B2Mj67W7KG04tLXqVlP1ax-srbNLrJSEupOeTSKMTgh1hlhm3YbYfkQwXlsIy8iKq6ylA68w9Ckhs9DPV2-FNtraP71DCxBFn9PW3Y3gNoT4yCJngxGfL3Lal7NqMJAwIZv9jcZ_QpiLUSDom4eNs3NLtxIQf_aG9Jm4Tm5U60whCRgaw9bNSzifA_yluRgAQXnZ1foVpGUhPH1fOgowXbpMODHQSeliTV4IgCJMqExAJetu6f4vXVaB2QI-5brA-rDqxi2n0FubbnJlW4Ah3Hw");
        request.send();


    })
    return dispatch => {
        return (promise).then(response => {
            dispatch(receiveUserList(response));
        }).catch(response => console.log("ERROR"));
    }
}


export function receiveUserList(data){
    return {
        type: RECIEVE_USER_LIST,
        data
    }
}