import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

const DeliveryOrPickupSection = () => {
  const [pickup, setPickup] = useState(false);

  return (
    <div>
      <Checkbox onChange={() => setPickup(!pickup)} checked={pickup} />
      I'd like to pickup
      <section>Delivery Address</section>
    </div>
  );
};

export default DeliveryOrPickupSection;