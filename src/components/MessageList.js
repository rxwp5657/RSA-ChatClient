import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({messages, recipient}) => {
    return(
        <div class="message-list">
            <div id="contact-bar">
                <span>{recipient}</span>
            </div>
            <div id="msgs">
                {
                    messages.map((messageObj) => {
                        return(
                            <Message
                            message={messageObj.message}
                            encriptedMessage={messageObj.encriptedMessage}
                            sender={messageObj.sender}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MessageList