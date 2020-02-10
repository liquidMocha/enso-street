import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import PostItemTitleBar from '../shared/PostItemTitleBar';
import '../../styles/Input.scss';
import './PriceAndDelivery.scss';
import RentalPriceInputSection from './RentalPriceInputSection';
import DeliveryToggle from './DeliveryToggle';
import DeliveryFeeInputSection from './DeliveryFeeInputSection';
import ProgressBar from './ProgressBar';
import LocationInput from './LocationInput';

const PriceAndDelivery = ({
  item,
  onDailyRentalChange,
  onDepositChange,
  onCanBeDeliveredChange,
  onDeliveryStartingPriceChange,
  onDeliveryAdditionalPriceChange,
}) => (
  <div>
    <PostItemTitleBar
      backLink="/details"
      title="Post Items"
      backLinkState={{ item }}
    />
    <ProgressBar />
    <RentalPriceInputSection
      deposit={item.deposit}
      rentalDailyPrice={item.rentalDailyPrice}
      onDailyRentalChange={onDailyRentalChange}
      onDepositChange={onDepositChange}
    />
    <LocationInput
      chooseLocationPath="/choose-location"
      location={item.location}
    />
    <DeliveryToggle
      canBeDelivered={item.canBeDelivered}
      updatePostedItemCanBeDelivered={onCanBeDeliveredChange}
    />
    {item.canBeDelivered
      ? (
        <DeliveryFeeInputSection
          deliveryStarting={item.deliveryStarting}
          deliveryAdditional={item.deliveryAdditional}
          onDeliveryStartingPriceChange={onDeliveryStartingPriceChange}
          onDeliveryAdditionalPriceChange={onDeliveryAdditionalPriceChange}
        />
      )
      : null}
    <Link to="/preview">
      <button id="preview-button">
        Preview
      </button>
    </Link>
  </div>
);

PriceAndDelivery.propTypes = {
  item: PropTypes.any,
  onDailyRentalChange: PropTypes.func.isRequired,
  onDepositChange: PropTypes.func.isRequired,
  onCanBeDeliveredChange: PropTypes.func.isRequired,
  onDeliveryStartingPriceChange: PropTypes.func.isRequired,
  onDeliveryAdditionalPriceChange: PropTypes.func.isRequired,
};

export default PriceAndDelivery;
