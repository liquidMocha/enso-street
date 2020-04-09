import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

const DeliveryOrPickupSection = () => {
  const [pickup, setPickup] = useState(false);

  return (
    <section>
      <Checkbox onChange={() => setPickup(!pickup)} checked={pickup} />
      I&apos;d like to pickup
      <br />
      <h1>Delivery Address</h1>
    </section>
  );
};

export default DeliveryOrPickupSection;
