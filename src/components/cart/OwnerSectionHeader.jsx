import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import PropTypes from 'prop-types';
import './OwnerSectionHeader.scss';

const OwnerSectionHeader = ({ ownerName }) => (
  <section className="owner-section__owner-name">
    {ownerName}
    <FontAwesomeIcon icon={faTrashAlt} />
  </section>
);

OwnerSectionHeader.propTypes = {
  ownerName: PropTypes.string,
};

OwnerSectionHeader.defaultProps = {
  ownerName: '',
};
export default OwnerSectionHeader;
