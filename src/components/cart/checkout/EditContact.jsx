import PropTypes from 'prop-types';
import React, { useState } from 'react';
import InputWithError from '../../shared/InputWithError';
import ColoredButton from '../../shared/ColoredButton';
import TitleBar from '../../shared/TitleBar';

const EditContact = ({ contact, onSaveContact }) => {
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);

  return (
    <div className="column-layout">
      <TitleBar />
      <InputWithError
        label="First Name"
        type="text"
        onChange={(value) => { setFirstName(value); }}
        value={firstName}
        id="edit-contact-first-name"
        shouldError={() => false}
      />
      <InputWithError
        label="Last Name"
        type="text"
        onChange={(value) => { setLastName(value); }}
        value={lastName}
        id="edit-contact-last-name"
        shouldError={() => false}
      />
      <InputWithError
        label="Phone"
        type="text"
        onChange={(value) => { setPhone(value); }}
        value={phone}
        id="edit-contact-phone"
        shouldError={() => false}
      />
      <InputWithError
        label="Email"
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
