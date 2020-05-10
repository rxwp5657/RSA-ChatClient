import {makeMessage, 
        makeContact,
        updateMessage,
        generateKeysRSA
} from './utils/utils'

import {SHOW_MESSAGE, 
        SEND_MESSAGE_PENDING,
        SEND_MESSAGE_FAILED,
        SEND_MESSAGE_SUCCESS,
        RECEIVE_MESSAGE,
        CHANGE_CHATROOM,
        ADD_CONTACT,
        LOGIN_PENDING,
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        CLEAR_MESSAGES,
        KEY_GENERATION_SUCCESS,
        KEY_GENERATION_PENDING,
        KEY_GENERATION_FAILED
} from './constants'

const messageInitialState = {
    messages : [], 
    error    : "",
    lastMessageID : 0
}

const chatRoomInitialState = {
    recipient : ""
}

const contactsInitialState = {
    constacts : []
}

const signInInitialState = {
    signedIn : false,
    userName : "",
    status   : "",
    keys     : {}
}

export const messageHandler = (state = messageInitialState, action = {}) => {
    switch (action.type) {
        case SHOW_MESSAGE:
            return {...state, messages : [...state.messages, makeMessage(action.payload)]}
        case SEND_MESSAGE_PENDING:
            return state
        case SEND_MESSAGE_SUCCESS:
            return {...state, messages : updateMessage(state.messages, action.payload.id, "status", action.payload.response)}
        case SEND_MESSAGE_FAILED:
            return {...state, messages : updateMessage(state.messages, action.payload.id, "status", action.payload.error)}
        case RECEIVE_MESSAGE:
            return {...state, lastMessageID: state.lastMessageID + 1, messages : [...state.messages, makeMessage(action.payload)]}
        case CLEAR_MESSAGES:
            return {...state, messages : []}
        default :
            return state;
    }
}

export const chatRoomHandler = (state = chatRoomInitialState, action = {}) => {
    switch (action.type) {
        case CHANGE_CHATROOM:
            return {...state, recipient : action.payload}
        default:
            return state;
    }
}

export const contactHandler = (state = contactsInitialState, action = {}) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {...state, constacts : [...state.constacts, makeContact(action.payload)]}
        default:
            return state;
    }
}

export const signInHandler = (state = signInInitialState, action = {}) => {
    switch (action.type) {
        case LOGIN_PENDING:
            return state;
        case LOGIN_SUCCESS:
            return {...state, userName: action.payload}
        case LOGIN_FAILED:
            return {...state, status: "User name already exists"}
        case KEY_GENERATION_PENDING:
            return {...state, status: "Generating keys, please wait"}
        case KEY_GENERATION_SUCCESS:
            return {...state, signedIn: true, keys: generateKeysRSA(action.payload)}
        case KEY_GENERATION_FAILED:
            return {...state, status: `Unable to generate keys because ${action.payload}`}
        default:
            return state;
    }
}