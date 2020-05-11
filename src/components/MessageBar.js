import React from 'react'
import './MessageBar.css'
import send_picture from './enviar.png'

const MessageBar = ({buttonEvent, lastSentMessage, recipient}) => {
    return(
            <div class="write">
                <textarea id="messageBox" placeholder="Enter a message..." class="esc-mens"></textarea>
                <button class="btn-enviar" onClick={(event) => {
                    buttonEvent(document.getElementById("messageBox").value, lastSentMessage, recipient);
                }}>
                    <img src={send_picture}></img>
                </button>
            </div>
    );
}

export default MessageBar