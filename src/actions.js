import axios from 'axios';

import {SHOW_MESSAGE, 
        SEND_MESSAGE_PENDING,
        SEND_MESSAGE_FAILED,
        SEND_MESSAGE_SUCCESS,
        RECEIVE_MESSAGE,
        CHANGE_CHATROOM,
        ADD_CONTACT,
        REQUEST_CONTACTS_FAILED,
        REQUEST_CONTACTS_SUCEESS,
        REQUEST_CONTACTS_PENDING,
        senders,
        LOGIN_PENDING,
        LOGIN_SUCCESS,
        LOGIN_FAILED
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
});

export const changeChatRoom = (recipient) => ({
    type    : CHANGE_CHATROOM,
    payload : recipient
});
 
export const addContact = (contactName) => ({
    type    : ADD_CONTACT,
    payload : {name  : contactName, image : ""}
});

export const receiveConnectedContacts = () => {
    
    return dispatch => {

        dispatch({type: REQUEST_CONTACTS_PENDING});

        axios.get("http://localhost:4000/connectedContacts")
        .then(res => {
            
            const contactNames= res.data;

            contactNames.forEach(contactName => {
                dispatch(addContact(contactName));
            });
            
        })
        .catch(err => {
            dispatch({type: REQUEST_CONTACTS_FAILED,  payload: err})
        })
    }   
}

export const submitForm = (userName) => {

    return dispatch => {
        dispatch({type: LOGIN_PENDING});

        axios.post("http://localhost:4000/validateUser", {
            userName: userName
        })
        .then(res => {
            dispatch({type: LOGIN_SUCCESS, payload: userName})
        })
        .catch(err => {
            console.log(err)
            dispatch({type: LOGIN_FAILED,  payload: err.body})
        })
    }
}
