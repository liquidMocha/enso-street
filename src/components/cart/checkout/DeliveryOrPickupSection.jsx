import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../../shared/Checkbox';
import LocationInput from '../../postItem/LocationInput';

const DeliveryOrPickupSection = ({
  chooseLocationPath, location, renterPickup, onRenterPickupChange,
}) => (
  <section>
    <Checkbox
      onChange={onRenterPickupChange}
      checked={renterPickup}
    />
    I&apos;d like to pickup
    {renterPickup ? null
      : (
        <>
          <br />
          <h1>Delivery Address</h1>
          <LocationInput
            chooseLocationPath={chooseLocationPath}
            address={location}
            displayReassurance={false}
          />
        </>
      )}
  </section>
);

DeliveryOrPickupSection.propTypes = {
  chooseLocationPath: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired,
  renterPickup: PropTypes.bool.isRequired,
  onRenterPickupChange: PropTypes.func.isRequired,
};

export default DeliveryOrPickupSection;
