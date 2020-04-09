import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import './OrderDetails.scss';

function displayItems(selectedItems, rentalDays) {
  return (
    selectedItems.map((item) => (
      <section className="confirm-checkout__item-details" key={item.id}>
        <img src={item.imageUrl} alt={item.title} />
        <section>
          <div>{item.title}</div>
          <div>
            Qty:
            {item.quantity}
          </div>
          <div>
            Item Price: $
            {item.rentalDailyPrice}
            {' '}
            per day(each)
          </div>
          <div>
            Total Item Cost: $
            {item.rentalDailyPrice * item.quantity * rentalDays}
          </div>
        </section>
      </section>
    ))

  );
}

const OrderDetails = ({ rentalDays }) => {
  const selectedItems = useSelector((state) => state.cart.cart.getSelectedBatch().items
    .filter((item) => item.selected));

  return (
    <section className="confirm-checkout__order-details">
      <h1>Order Details</h1>
      {displayItems(selectedItems, rentalDays)}
    </section>
  );
};

OrderDetails.propTypes = {
  rentalDays: PropTypes.number.isRequired,
};

export default OrderDetails;
