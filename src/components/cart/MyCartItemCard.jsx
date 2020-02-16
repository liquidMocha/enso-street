import PropTypes from 'prop-types';
import React from 'react';
import './MyCartItemCard.scss';

const MyCartItemCard = ({ item }) => (
  <div className="my-cart__item-card">
    <section className="my-cart_-item-card--first-column">
      <img src={item.imageUrl} alt={item.title} />
    </section>
    <section className="my-cart_-item-card--second-column">
      <h1>{item.title}</h1>
      <span>
        $
        {item.rentalDailyPrice}
        {' '}
        per day
      </span>
    </section>
    <section className="my-cart_-item-card--third-column">
      X
    </section>
  </div>
);

MyCartItemCard.propTypes = {
  item: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    rentalDailyPrice: PropTypes.string,
  }).isRequired,
};

export default MyCartItemCard;
