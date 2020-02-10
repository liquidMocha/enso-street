import PropTypes from 'prop-types';
import React from 'react';
import DollarInput from '../shared/DollarInput';

const DeliveryFeeInputSection = ({
  deliveryStarting,
  onDeliveryStartingPriceChange,
  deliveryAdditional,
  onDeliveryAdditionalPriceChange,
}) => (
  <div id="price-and-delivery-fee-section">
    Delivery fee
    <div>
      <DollarInput
        value={deliveryStarting}
        onChange={(event) => {
          onDeliveryStartingPriceChange(event.target.value);
        }}
      />
      <label>within 3 miles</label>
    </div>
    <div>
      <DollarInput
        value={deliveryAdditional}
        onChange={(event) => {
          onDeliveryAdditionalPriceChange(event.target.value);
        }}
      />
      <label>per additional mile</label>
    </div>
  </div>
);

DeliveryFeeInputSection.propTypes = {
  deliveryStarting: PropTypes.number.isRequired,
  deliveryAdditional: PropTypes.number.isRequired,
  onDeliveryStartingPriceChange: PropTypes.func.isRequired,
  onDeliveryAdditionalPriceChange: PropTypes.func.isRequired,
};

export default DeliveryFeeInputSection;
