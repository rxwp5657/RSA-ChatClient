import React from 'react';
import './Contact.css'
import profile_picture from './profile_placeholder.png'


const Contact = ({name, image}) => {
    return(
        <div class="contact-data">
            <label>{name}</label>
            <img src={profile_picture} alt="Contact Profile" class="profile-picture"></img>
        </div>
    );
}

export default Contact