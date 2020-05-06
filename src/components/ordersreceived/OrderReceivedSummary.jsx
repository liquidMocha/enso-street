import PropTypes from 'prop-types';
import React from 'react';
import './OrderReceivedSummary.scss';

const OrderReceivedSummary = ({ numberOfOrders, orderValue }) => (
  <section id="order-received-summary">
    <section>
      <div>{numberOfOrders}</div>
      <div>Total Orders</div>
    </section>
    <section>
      <div>{orderValue}</div>
      <div>Order Volume</div>
    </section>
  </section>
);

OrderReceivedSummary.propTypes = {
  numberOfOrders: PropTypes.number,
  orderValue: PropTypes.number,
};

OrderReceivedSummary.defaultProps = {
  numberOfOrders: 0,
  orderValue: 0,
};


export default OrderReceivedSummary;
