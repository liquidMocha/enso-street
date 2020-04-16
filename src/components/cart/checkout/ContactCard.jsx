import PropTypes from 'prop-types';
import React from 'react';
import './ContactCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const ContactCard = ({ contact, onClick, onClickEditContact }) => (
  <div
    onClick={() => { onClick(); }}
    className="contact-card"
  >
    <section className="contact-card__content">
      <div>
        <label>Full Name</label>
        {`${contact.firstName} ${contact.lastName}`}
      </div>
      <div>
        <label>Phone</label>
        {contact.phone}
      </div>
      <div>
        <label>Email</label>
        {contact.email}
      </div>
    </section>
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
