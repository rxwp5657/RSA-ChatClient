import React, {useEffect}         from "react";
import MessageList                from "../components/MessageList";
import MessageBar                 from "../components/MessageBar";
import ContactList                from "../components/ContactList";
import socketIOClient             from "socket.io-client";
import {connect, useDispatch}     from 'react-redux';
import {showMessage, sendMessage, receiveMessage} from '../actions';
import './ChatRoom.css'

let contacts = [
    {
        name  : "Amorcito",
        image : "",
    },
    {
        name  : "Michu",
        image : "",
    }
];

const RSA = (message) => {
    return "883ahdp38723nl0"
}

const decript = (message) => {
    return "plain text";
}

const mapStateToProps = (state) => ({
    messages      : state.messages,
    lastMessageID : state.lastMessageID
});

const mapDispatchToProps = (dispatch) => ({
    onSendMessage: (message, messageID, receiver) => {
        let encriptedMessage = RSA(message)
        dispatch(showMessage(message, encriptedMessage, "pending"))
        sendMessage(encriptedMessage, receiver, messageID)(dispatch);
    }
})

const ChatRoom = (props) => {

    const dispatch   = useDispatch();

    useEffect(() => {
        const socket = socketIOClient("http://localhost:4000");

        socket.on("receive", (data) => {
            let plainMessage = decript(data.message);
            dispatch(receiveMessage(plainMessage, data.message));
        });

        socket.on("register", () => {
            socket.emit("registering", {userName: "charly", pubKey: "0hbnadw"})
        });
        
    }, []);
    
    return(
        <div class="chat-room">
            <ContactList contacts={contacts}/>
            <MessageList messages={props.messages}/>  
            <MessageBar buttonEvent={props.onSendMessage} lastSentMessage={props.lastMessageID} receiver={"charly"}/>
        </div>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)