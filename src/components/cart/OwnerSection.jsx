import React from 'react';
import PropTypes from 'prop-types';
import MyCartItemCard from './MyCartItemCard';

const OwnerSection = ({ items }) => (
  <div className="owner-section">
    {items.map((item) => (
      <MyCartItemCard key={item.id} item={item} />
    ))}
  </div>
);

OwnerSection.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    rentalDailyPrice: PropTypes.number,
  })).isRequired,
};

export default OwnerSection;
