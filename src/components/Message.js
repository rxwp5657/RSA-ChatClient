import React from 'react';
import './Message.css';

const Message = ({message, encriptedMessage, sender}) => {
    return(
        <div class={sender}>
            <p>{message}</p>
            <p>{encriptedMessage}</p>
        </div>
    );
}

export default Message