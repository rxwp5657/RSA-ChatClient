import {SEND_MESSAGE} from './constants'


const messageInitialState = {
    message : "" 
}

const contactsIntialState = 
{
    contacts : []
}

export const messageHandler = (state = messageInitialState, action = {}) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {... state, message : action.payload}
        default :
            return state;
    }
}