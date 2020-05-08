import React from 'react';
import Contact from './Contact';
import './ContactList.css';

const ContactList = ({contacts, changeRecipient}) => {
    return(
        <div class="column contact-list">
            {
                contacts.map((contactObj) => {
                    return(
                        <Contact
                           name={contactObj.name}
                           image={contactObj.picture}
                           changeRecipient={changeRecipient}
                        />
                    );
                })
            }
        </div>
    );
}

export default ContactList