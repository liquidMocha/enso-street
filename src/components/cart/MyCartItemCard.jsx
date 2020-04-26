import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './MyCartItemCard.scss';
import { useDispatch } from 'react-redux';
import Checkbox from '../shared/Checkbox';
import {
  addToCart,
  addToCartSelectionAction,
  removeFromCartAction,
  removeFromCartSelectionAction,
} from '../../redux/cart/cartAction';
import ItemCounter from './ItemCounter';
import DeleteItemModal from './DeleteItemModal';

const highlightCard = (highlighted) => (highlighted ? ' highlight' : '');

const MyCartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className={`my-cart__item-card${highlightCard(item.selected)}`}>
      <Checkbox
        onChange={() => {
          if (item.selected) {
            dispatch(removeFromCartSelectionAction(item.id));
          } else {
            dispatch(addToCartSelectionAction(item.id));
          }
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
        <div onClick={() => setShowDeleteModal(true)}>X</div>
        <ItemCounter
          count={item.quantity}
          decrement={() => {
            if (item.quantity === 1) {
              setShowDeleteModal(true);
            } else {
              dispatch(removeFromCartAction(item.id));
            }
          }}
          increment={() => {
            dispatch(addToCart(item.id));
          }}
        />
      </section>
      <DeleteItemModal
        isOpen={showDeleteModal}
        onDelete={() => {
          dispatch(removeFromCartAction(item.id, true));
          setShowDeleteModal(false);
        }}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

MyCartItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    rentalDailyPrice: PropTypes.number,
    selected: PropTypes.bool,
    quantity: PropTypes.number,
  }).isRequired,
};

export default MyCartItemCard;
