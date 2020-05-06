import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({messages}) => {
    return(
        <div class="column message-list">
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
    );
}

export default MessageList