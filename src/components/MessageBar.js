import React from 'react'
import './MessageBar.css'
import send_picture from './enviar.png'

const MessageBar = ({buttonEvent}) => {
    return(
        <div class="footer">
            <div class="column write">
                <textarea id="messageBox" placeholder="Enter a message..." class="esc-mens"></textarea>
                <button onClick={buttonEvent} class="btn-enviar">
                    <img src={send_picture}></img>
                </button>
            </div>
        </div>
    );
}

export default MessageBar