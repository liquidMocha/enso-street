import React from 'react';
import PropTypes from 'prop-types';

const OrderSummary = ({ subtotal, deliveryFee, calculatingDeliveryFee }) => (
  <section>
    <label>Subtotal: </label>
    <span>
      {`$${subtotal}`}
    </span>
    <label>Delivery: </label>
    <span>
      {calculatingDeliveryFee ? 'calculating...' : `$${deliveryFee}`}
    </span>
  </section>
);

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  calculatingDeliveryFee: PropTypes.bool.isRequired,
};

export default OrderSummary;
