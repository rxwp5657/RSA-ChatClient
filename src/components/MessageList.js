import React from 'react';
import Message from './Message';
import './MessageList.css';

const MessageList = ({messages}) => {
    return(

        <div class="message-list">
            <div id="contact-bar"></div>
                <div id="block"></div>
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