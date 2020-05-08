import React from 'react'
import './MessageBar.css'

const MessageBar = ({buttonEvent, lastSentMessage, recipient}) => {
    return(
        <div class="footer">
            <div class="row">
                <div class="column input-text">
                    <textarea id="messageBox" placeholder="Enter message..."> </textarea>
                </div>
                <div class="column send-button">
                    <button onClick={ (event) => {
                            buttonEvent(document.getElementById("messageBox").value, lastSentMessage, recipient);
                        }
                    }> Send</button>
                </div>
            </div>
        </div>
    );
}

export default MessageBar