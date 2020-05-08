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
        addContact,
        receiveConnectedContacts} from '../actions';
import './ChatRoom.css'

const RSA = (message) => {
    return "883ahdp38723nl0"
}

const decript = (message) => {
    return "plain text";
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
            <ContactList contacts={props.contacts} changeRecipient={props.onChangeChatRoom}/>
            <MessageList messages={props.messages}/>  
            <MessageBar buttonEvent={props.onSendMessage} lastSentMessage={props.lastMessageID} recipient={props.recipient}/>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)