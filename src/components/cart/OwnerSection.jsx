import React from 'react';
import PropTypes from 'prop-types';
import './OwnerSection.scss';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyCartItemCard from './MyCartItemCard';

const OwnerSection = ({ owner, items }) => (
  <div className="owner-section">
    <section className="owner-section__owner-name">
      {owner.name}
      <FontAwesomeIcon icon={faTrashAlt} />
    </section>
    {items.map((item) => (
      <MyCartItemCard key={item.id} item={item} />
    ))}
  </div>
);

OwnerSection.propTypes = {
  owner: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    rentalDailyPrice: PropTypes.string,
  })).isRequired,
};

export default OwnerSection;
