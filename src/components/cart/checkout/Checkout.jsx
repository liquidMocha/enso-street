import React, { useState } from 'react';
import TitleBar from '../../shared/TitleBar';
import RentalDate from './RentalDate';
import ColoredButton from '../../shared/ColoredButton';
import DeliveryOrPickupSection from './DeliveryOrPickupSection';
import CustomerInformation from './CustomerInformation';
import DeliveryContact from './DeliveryContact';
import OrderDetails from './OrderDetails';

const Checkout = () => {
  const [rentDate, setRentDate] = useState();
  const [returnDate, setReturnDate] = useState();

  return (
    <div className="confirm-checkout-page">
      <TitleBar />
      <RentalDate
        rentDate={rentDate}
        onRentDateChange={setRentDate}
        returnDate={returnDate}
        onReturnDateChange={setReturnDate}
      />
      <DeliveryOrPickupSection />
      <CustomerInformation />
      <DeliveryContact />
      <OrderDetails />
      <ColoredButton buttonText="Confirm Order" mode="light" />
    </div>
  );
};

export default Checkout;
