import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import PersonInfo from './PersonInfo';

const DeliveryContact = ({ value, onEdit }) => (
  <section>
    <h1>Delivery Contact</h1>
    <FontAwesomeIcon icon={faEdit} onClick={onEdit} />
    <PersonInfo fullName={`${value.firstName} ${value.lastName}`} phone={value.phone} email={value.email} />
  </section>
);

DeliveryContact.propTypes = {
  value: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default DeliveryContact;
