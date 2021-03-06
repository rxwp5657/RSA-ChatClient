import React from 'react';
import './Contact.css'
import profile_placeholder from './profile_placeholder.png'


const Contact = ({name, image, pubKey, changeRecipient}) => {
    return(
        <div class="contact-data" onClick={(event) => changeRecipient({name: name, pubKey: pubKey})}>
            <img src={profile_placeholder} alt="Contact Profile" class="profile-picture"></img>
            <span>{name}</span>
        </div>
    );
}

export default Contact