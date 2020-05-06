import PropTypes from 'prop-types';
import React from 'react';
import './OrderLineItemIcon.scss';

const OrderLineItemIcon = ({ imageUrl, quantity }) => (
  <div className="order-line-item-icon">
    <img src={imageUrl} />
    <span className="fa-layers fa-3x">
      <span
        className="fa-layers-counter fa-layers-top-right fa-lg"
        style={{ background: 'Tomato' }}
      >
        {quantity}
      </span>
    </span>
  </div>
);

OrderLineItemIcon.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default OrderLineItemIcon;
