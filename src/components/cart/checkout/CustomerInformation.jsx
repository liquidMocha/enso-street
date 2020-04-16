import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import PersonInfo from './PersonInfo';

const CustomerInformation = ({ value, onEdit }) => (
  <section>
    <h1>Customer Information</h1>
    <FontAwesomeIcon icon={faEdit} onClick={onEdit} />
    <PersonInfo fullName={`${value.firstName} ${value.lastName}`} phone={value.phone} email={value.email} />
  </section>
);

CustomerInformation.propTypes = {
  value: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CustomerInformation;
