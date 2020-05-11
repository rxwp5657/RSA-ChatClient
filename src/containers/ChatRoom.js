import React, {useEffect}         from "react";
import MessageList                from "../components/MessageList";
import MessageBar                 from "../components/MessageBar";
import ContactList                from "../components/ContactList";
import socketIOClient             from "socket.io-client";
import {modularPow}               from "../utils/utils"
import {connect, useDispatch}     from 'react-redux';
import {showMessage, 
        sendMessage, 
        receiveMessage,
        changeChatRoom,
        clearMessages,
        addContact,
        receiveConnectedContacts} from '../actions';
import './ChatRoom.css'


const encrypt = (message, pubKey) => {
    let e = (0n).constructor(pubKey[0])
    let m = (0n).constructor(pubKey[1])
    return message.split('').map((char) => modularPow((0n).constructor(char.charCodeAt(0)), e, m))
    .join("/");
}

const decrypt = (message, privKey) => {
    let e = (0n).constructor(privKey[0])
    let m = (0n).constructor(privKey[1])
    return message.split('/').map((num) => String.fromCharCode(Number(modularPow((0n).constructor(num), e, m))))
    .join("");
}

const mapStateToProps = (state) => ({
    messages      : state.messageHandler.messages,
    lastMessageID : state.messageHandler.lastMessageID,
    recipient     : state.chatRoomHandler.recipient,
    contacts      : state.contactHandler.constacts
});

const mapDispatchToProps = (dispatch) => ({

    onSendMessage: (message, messageID, receiver) => {
        let encriptedMessage = encrypt(message, receiver.pubKey)
        dispatch(showMessage(message, encriptedMessage, "pending"))
        sendMessage(encriptedMessage, receiver.name, messageID)(dispatch);
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
            socket.emit("registering", {userName: props.userName, pubKey: props.keys.public})
            receiveConnectedContacts()(dispatch);
        });

        socket.on("receive", (data) => {
            let plainMessage = decrypt(data.message, props.keys.private);
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