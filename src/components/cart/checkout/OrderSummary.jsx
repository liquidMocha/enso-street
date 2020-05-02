import React from 'react';
import PropTypes from 'prop-types';
import './OrderSummary.scss';

const OrderSummary = ({ subtotal, deliveryFee, calculatingDeliveryFee }) => (
  <section className="checkout__order-summary">
    <section>
      <label>Subtotal: </label>
      <span>
        {`$${subtotal}`}
      </span>
    </section>
    <section>
      <label>Delivery: </label>
      <span>
        {calculatingDeliveryFee ? 'calculating...' : `$${deliveryFee}`}
      </span>
    </section>
    <section>
      <label className="checkout__order-summary--emphasis">Order total: </label>
      <span>{calculatingDeliveryFee ? 'calculating...' : `$${subtotal + deliveryFee}`}</span>
    </section>
  </section>
);

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  calculatingDeliveryFee: PropTypes.bool.isRequired,
};

export default OrderSummary;