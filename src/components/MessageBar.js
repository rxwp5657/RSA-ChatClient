import React from 'react'
import './MessageBar.css'

const MessageBar = ({buttonEvent}) => {
    return(
        <div class="footer">
            <div class="row">
                <div class="column input-text">
                    <textarea id="messageBox" placeholder="Enter message..."> </textarea>
                </div>
                <div class="column send-button">
                    <button onClick={buttonEvent}> Send</button>
                </div>
            </div>
        </div>
    );
}

export default MessageBar