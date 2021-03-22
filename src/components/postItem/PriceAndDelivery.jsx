import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { isNil, path } from 'ramda';
import PostItemTitleBar from '../shared/PostItemTitleBar';
import '../../styles/Input.scss';
import './PriceAndDelivery.scss';
import RentalPriceInputSection from './RentalPriceInputSection';
import DeliveryToggle from './DeliveryToggle';
import DeliveryFeeInputSection from './DeliveryFeeInputSection';
import ProgressBar from './ProgressBar';
import LocationInput from './LocationInput';
import ColoredButton from '../shared/ColoredButton';

const getAddress = path(['location', 'address']);

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
      address={getAddress(item)}
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
      <ColoredButton buttonText="Preview" mode="dark" disabled={isNil(getAddress(item))} />
    </Link>
  </div>
);

PriceAndDelivery.propTypes = {
  item: PropTypes.shape({
    deposit: PropTypes.number,
    rentalDailyPrice: PropTypes.number,
    location: PropTypes.shape({
      address: PropTypes.shape({
        street: PropTypes.string,
        zipCode: PropTypes.string,
      }),
    }),
    canBeDelivered: PropTypes.bool,
    deliveryStarting: PropTypes.number,
    deliveryAdditional: PropTypes.number,
  }).isRequired,
  onDailyRentalChange: PropTypes.func.isRequired,
  onDepositChange: PropTypes.func.isRequired,
  onCanBeDeliveredChange: PropTypes.func.isRequired,
  onDeliveryStartingPriceChange: PropTypes.func.isRequired,
  onDeliveryAdditionalPriceChange: PropTypes.func.isRequired,
};

export default PriceAndDelivery;
