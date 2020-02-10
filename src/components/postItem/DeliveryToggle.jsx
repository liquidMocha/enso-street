import PropTypes from 'prop-types';
import React from 'react';
import Toggle from './Toggle';
import '../../styles/font.scss';

const DeliveryToggle = ({
  canBeDelivered,
  updatePostedItemCanBeDelivered,
}) => (
  <div id="price-and-delivery-can-be-delivered-section">
    <span className="bold">This item can be delivered</span>
    <Toggle
      value={canBeDelivered}
      onChange={updatePostedItemCanBeDelivered}
    />
  </div>
);

DeliveryToggle.propTypes = {
  canBeDelivered: PropTypes.bool.isRequired,
  updatePostedItemCanBeDelivered: PropTypes.func.isRequired,
};

export default DeliveryToggle;
