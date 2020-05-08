import React from 'react';
import profile_picture from './profile_placeholder.png'
import './Contact.css'


const Contact = ({name, image, changeRecipient}) => {
    return(
        <div class="contact-data" onClick={(event) => changeRecipient(name)}>
            <label>{name}</label>
            <img src={profile_picture} alt="Contact Profile" class="profile-picture"></img>
        </div>
    );
}

export default Contact