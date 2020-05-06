import {SEND_MESSAGE} from './constants'

export const sendMessage = (event) => {
    console.log(document.getElementById("messageBox").value)
    
    return {
        type    : SEND_MESSAGE,
        payload : document.getElementById("messageBox").value
    }
}

