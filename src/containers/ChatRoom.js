import React, {Component} from "react";
import MessageList        from "../components/MessageList";
import MessageBar         from "../components/MessageBar";
import ContactList        from "../components/ContactList";
import {sendMessage}      from '../actions';
import {connect}          from 'react-redux';
import './ChatRoom.css'


const senders = {
    OWNER   : "owner",
    CONTACT : "contact"
}

let messages = [
    {
        message : "Esta es una prueba",
        encriptedMessage : "883ahdp38723nl0",
        sender : senders.CONTACT 
    },
    {
        message : "Esta es una prueba2",
        encriptedMessage : "883ahdp38723nl0",
        sender : senders.OWNER
    }
];

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


const mapStateToProps = (state) => ({
    message : state.message
});

const mapDispatchToProps = (dispatch) => ({
    onSendMessage: (event) => dispatch(sendMessage(event))
})

class ChatRoom extends Component {
    render(){
        return(
            <div class="chat-room">
                <ContactList contacts={contacts}/>
                <MessageList messages={messages}/>
                <MessageBar buttonEvent={this.props.onSendMessage}/>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)