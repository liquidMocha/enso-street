import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import PersonInfo from './PersonInfo';
import Checkbox from '../../shared/Checkbox';
import './DeliveryContact.scss';

const DeliveryContact = ({
  value, onEdit, sameAsCustomer, onChangeSameAsCustomer,
}) => (
  <section className="delivery-contact-selection">
    <h1>Delivery Contact</h1>
    {sameAsCustomer ? null : <FontAwesomeIcon icon={faEdit} onClick={onEdit} />}
    <section>
      <Checkbox
        onChange={onChangeSameAsCustomer}
        checked={sameAsCustomer}
      />
      Same As Customer
    </section>
    {sameAsCustomer ? null
      : (
        <>
          <PersonInfo
            fullName={`${value.firstName || ''} ${value.lastName || ''}`}
            phone={value.phone}
            email={value.email}
          />
        </>
      )}

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
  sameAsCustomer: PropTypes.bool.isRequired,
  onChangeSameAsCustomer: PropTypes.func.isRequired,
};

export default DeliveryContact;
