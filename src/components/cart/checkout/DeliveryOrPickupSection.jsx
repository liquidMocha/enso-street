import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';
import LocationInput from '../../postItem/LocationInput';

const DeliveryOrPickupSection = ({ chooseLocationPath, location }) => {
  const [pickup, setPickup] = useState(false);

  return (
    <section>
      <Checkbox onChange={() => setPickup(!pickup)} checked={pickup} />
      I&apos;d like to pickup
      <br />
      <h1>Delivery Address</h1>
      <LocationInput chooseLocationPath={chooseLocationPath} location={location} />
    </section>
  );
};

DeliveryOrPickupSection.propTypes = {
  chooseLocationPath: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired,
};

export default DeliveryOrPickupSection;
