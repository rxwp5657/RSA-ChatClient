import axios from 'axios';
import {SHOW_MESSAGE, 
        SEND_MESSAGE_PENDING,
        SEND_MESSAGE_FAILED,
        SEND_MESSAGE_SUCCESS,
        RECEIVE_MESSAGE,
        senders,
        SUBSCRIBE
    } from './constants'


export const showMessage = (messageContents, encriptedMessage, status) => ({
    type    : SHOW_MESSAGE,
    payload : {content: messageContents, encripted: encriptedMessage, status: status, sender: senders.OWNER} 
});

export const sendMessage = (encriptedMessage, receiver, messageID) => {
    
    return dispatch => {
        dispatch({type: SEND_MESSAGE_PENDING});
        axios.post("http://localhost:4000/sendMessage", {
            message  : encriptedMessage,
            receiver : receiver 
        })
        .then(res => {
            dispatch({type: SEND_MESSAGE_SUCCESS, payload: {response: res, id : messageID}})
        })
        .catch(err => {
            dispatch({type: SEND_MESSAGE_FAILED,  payload: {error: err, id : messageID}})
        })
    }   
}

export const receiveMessage = (messageContent, encriptedMessage) => ({
    type    : RECEIVE_MESSAGE,
    payload : {content: messageContent, encripted: encriptedMessage, status: "received", sender: senders.CONTACT}
})
