import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

function displayItems(selectedItems, rentalDays) {
  return (
    selectedItems.map((item) => (
      <section key={item.id}>
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
  const selectedItems = useSelector((state) => state.cart.cart.getSelectedBatch().items);

  return (
    <div>
      Order Details
      {displayItems(selectedItems, rentalDays)}
    </div>
  );
};

OrderDetails.propTypes = {
  rentalDays: PropTypes.number.isRequired,
};

export default OrderDetails;
