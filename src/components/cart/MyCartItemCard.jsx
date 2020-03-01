import PropTypes from 'prop-types';
import React from 'react';
import './MyCartItemCard.scss';
import { useDispatch } from 'react-redux';
import Checkbox from '../shared/Checkbox';
import { addToCartSelectionAction } from '../../redux/cart/cartAction';
import ItemCounter from './ItemCounter';

const highlightCard = (highlighted) => (highlighted ? ' highlight' : '');

const MyCartItemCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={`my-cart__item-card${highlightCard(item.selected)}`}>
      <Checkbox
        onChange={() => {
          dispatch(addToCartSelectionAction(item.id));
        }}
        checked={item.selected}
      />
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
        <ItemCounter
          count={item.quantity}
          decrement={() => {}}
          increment={() => {}}
        />
      </section>
    </div>
  );
};

MyCartItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    rentalDailyPrice: PropTypes.string,
    selected: PropTypes.bool,
    quantity: PropTypes.number,
  }).isRequired,
};

export default MyCartItemCard;
