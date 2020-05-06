import React from 'react';
import Contact from './Contact';
import './ContactList.css';

const ContactList = ({contacts}) => {
    return(
        <div class="column contact-list">
            {
                contacts.map((contactObj) => {
                    return(
                        <Contact
                           name={contactObj.name}
                           image={contactObj.picture}
                        />
                    );
                })
            }
        </div>
    );
}

export default ContactList