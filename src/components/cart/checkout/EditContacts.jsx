import PropTypes from 'prop-types';
import React from 'react';
import TitleBar from '../../shared/TitleBar';
import ContactCard from './ContactCard';
import ColoredButton from '../../shared/ColoredButton';

const EditContacts = ({ contacts, onEditContact, onContactChange }) => (
  <div>
    <TitleBar />
    <ColoredButton
      buttonText="Add New Contact"
      onClick={() => { onEditContact(); }}
      mode="light"
    />
    Or choose from saved contacts
    {contacts.map((contact) => (
      <ContactCard
        key={contact.id}
        contact={contact}
        onClickEditContact={() => {
          onEditContact(contact);
        }}
        onClick={() => {
          onContactChange(contact);
        }}
      />
    ))}
  </div>
);

EditContacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
    }),
  ).isRequired,
  onEditContact: PropTypes.func.isRequired,
  onContactChange: PropTypes.func.isRequired,
};

export default EditContacts;
