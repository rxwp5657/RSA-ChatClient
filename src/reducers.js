import {SHOW_MESSAGE, 
        SEND_MESSAGE_PENDING,
        SEND_MESSAGE_FAILED,
        SEND_MESSAGE_SUCCESS,
        RECEIVE_MESSAGE,
} from './constants'


const messageInitialState = {
    messages : [], 
    error    : "",
    lastMessageID : 0
}

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
            return {... state, messages : [...state.messages, makeMessage(action.payload)]}
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