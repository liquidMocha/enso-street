import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const ContactCard = ({ contact, onClick, onClickEditContact }) => (
  <div onClick={() => { onClick(); }}>
    <div>
      Full Name
      {' '}
      {`${contact.firstName} ${contact.lastName}`}
    </div>
    <div>
      Phone
      {' '}
      {contact.phone}
    </div>
    <div>
      Email
      {' '}
      {contact.email}
    </div>
    <div onClick={(event) => {
      event.stopPropagation();
      onClickEditContact(contact);
    }}
    >
      <FontAwesomeIcon icon={faEdit} />
    </div>
  </div>
);

ContactCard.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onClickEditContact: PropTypes.func.isRequired,
};

export default ContactCard;
