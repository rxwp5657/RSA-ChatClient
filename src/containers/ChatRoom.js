import React, {useEffect}         from "react";
import MessageList                from "../components/MessageList";
import MessageBar                 from "../components/MessageBar";
import ContactList                from "../components/ContactList";
import socketIOClient             from "socket.io-client";
import {connect, useDispatch}     from 'react-redux';
import {showMessage, 
        sendMessage, 
        receiveMessage,
        changeChatRoom,
        clearMessages,
        addContact,
        receiveConnectedContacts} from '../actions';
import './ChatRoom.css'

const RSA = (message) => {
    return message
}

const decript = (message) => {
    return message;
}

const mapStateToProps = (state) => ({
    messages      : state.messageHandler.messages,
    lastMessageID : state.messageHandler.lastMessageID,
    recipient     : state.chatRoomHandler.recipient,
    contacts      : state.contactHandler.constacts
});

const mapDispatchToProps = (dispatch) => ({

    onSendMessage: (message, messageID, receiver) => {
        let encriptedMessage = RSA(message)
        dispatch(showMessage(message, encriptedMessage, "pending"))
        sendMessage(encriptedMessage, receiver, messageID)(dispatch);
    },

    onChangeChatRoom : (recipient) => {
        dispatch(changeChatRoom(recipient));
        dispatch(clearMessages());
    }
})

const ChatRoom = (props) => {

    const dispatch   = useDispatch();

    useEffect(() => {
        const socket = socketIOClient("http://localhost:4000");

        socket.on("register", () => {
            socket.emit("registering", {userName: props.userName, pubKey: "0hbnadw"})
            receiveConnectedContacts()(dispatch);
        });

        socket.on("receive", (data) => {
            let plainMessage = decript(data.message);
            dispatch(receiveMessage(plainMessage, data.message));
        });

        socket.on("newContact", (data) => {
            dispatch(addContact(data.userName))
        });

    }, []);
    
    return(
        <div class="chat-room">
            <div class="contact-section">
                <ContactList contacts={props.contacts} changeRecipient={props.onChangeChatRoom}/> 
            </div>
            <div class="messages-section">
                <MessageList messages={props.messages}/>  
                <MessageBar buttonEvent={props.onSendMessage} lastSentMessage={props.lastMessageID} recipient={props.recipient}/>
            </div>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)