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
    error    : "",
    userName : ""
}

const makeContact = ({name, image}) => ({
    name  : name,
    image : image
});

const makeMessage = ({content, encripted, status, sender,}) => ({
    message          : content, 
    encriptedMessage : encripted, 
    sender           : sender,
    status           : status 
});

const changeMessageParam = (paramName, value, message) => {
    let change = {}
    change[paramName] = value 
    return Object.assign({}, message, change)
}

const updateMessage = (messages, id, paramName, value) => {
    return messages.map((message, i) => {
        if(i !== id){
            return message
        }
        return changeMessageParam(paramName, value, message);
    })
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
            return {...state, signedIn: true, userName: action.payload}
        case LOGIN_FAILED:
            return {...state, error: "User name already exists"}
        default:
            return state;
    }
}