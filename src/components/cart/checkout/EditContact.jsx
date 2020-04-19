import PropTypes from 'prop-types';
import React, { useState } from 'react';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';

const EditContact = ({ contact, onSaveContact }) => {
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);

  return (
    <div>
      <div>First Name</div>
      <InputWithError
        type="text"
        onChange={(value) => { setFirstName(value); }}
        value={firstName}
        id="edit-contact-first-name"
        shouldError={() => false}
      />
      <div>Last Name</div>
      <InputWithError
        type="text"
        onChange={(value) => { setLastName(value); }}
        value={lastName}
        id="edit-contact-last-name"
        shouldError={() => false}
      />
      <div>Phone</div>
      <InputWithError
        type="text"
        onChange={(value) => { setPhone(value); }}
        value={phone}
        id="edit-contact-phone"
        shouldError={() => false}
      />
      <div>Email</div>
      <InputWithError
        type="text"
        onChange={(value) => { setEmail(value); }}
        value={email}
        id="edit-contact-email"
        shouldError={() => false}
      />
      <ColoredButton
        buttonText="Save"
        mode="light"
        onClick={() => {
          onSaveContact({
            id: contact.id,
            firstName,
            lastName,
            phone,
            email,
          });
        }}
      />
    </div>
  );
};

EditContact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
  onSaveContact: PropTypes.func.isRequired,
};

EditContact.defaultProps = {
  contact: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
};

export default EditContact;
