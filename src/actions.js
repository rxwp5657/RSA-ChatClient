import axios from 'axios';
import {generatePrimes} from './utils/utils';

import {SHOW_MESSAGE, 
        SEND_MESSAGE_PENDING,
        SEND_MESSAGE_FAILED,
        SEND_MESSAGE_SUCCESS,
        RECEIVE_MESSAGE,
        CHANGE_CHATROOM,
        ADD_CONTACT,
        REQUEST_CONTACTS_FAILED,
        REQUEST_CONTACTS_PENDING,
        senders,
        LOGIN_PENDING,
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        CLEAR_MESSAGES,
        KEY_GENERATION_FAILED,
        KEY_GENERATION_PENDING,
        KEY_GENERATION_SUCCESS
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

export const clearMessages = () => ({
    type    : CLEAR_MESSAGES,
    payload : []
});
 
export const addContact = ({name, pubKey}) => ({
    type    : ADD_CONTACT,
    payload : {name  : name, image : "", pubKey: pubKey}
});

export const receiveConnectedContacts = () => {
    
    return dispatch => {

        dispatch({type: REQUEST_CONTACTS_PENDING});

        axios.get("http://localhost:4000/connectedContacts")
        .then(res => {
            
            const contactsData = res.data;

            contactsData.forEach(contactData => {
                dispatch(addContact(contactData));
            });
            
        })
        .catch(err => {
            dispatch({type: REQUEST_CONTACTS_FAILED,  payload: err})
        })
    }   
}

export const generateKeys = (size) => {

    return dispatch => {   

        dispatch({type: KEY_GENERATION_PENDING});
        
        generatePrimes(size)
        .then(payload => {
            dispatch({type: KEY_GENERATION_SUCCESS, payload: payload})
        })
        .catch(err => {
            dispatch({type: KEY_GENERATION_FAILED, payload: err});
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
            generateKeys(8n)(dispatch);
        })
        .catch(err => {
            dispatch({type: LOGIN_FAILED,  payload: err.body})
        })
    }
}