import React, { useState } from 'react';
import TitleBar from '../../shared/TitleBar';
import RentalDate from './RentalDate';
import ColoredButton from '../../shared/ColoredButton';
import DeliveryOrPickupSection from './DeliveryOrPickupSection';
import CustomerInformation from './CustomerInformation';
import DeliveryContact from './DeliveryContact';
import OrderDetails from './OrderDetails';

function calculateRentalDays(startDateTime, endDateTime) {
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

  return (
    (new Date(endDateTime).getTime() - new Date(startDateTime))
    / MILLISECONDS_IN_A_DAY).toFixed();
}

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
      <OrderDetails rentalDays={calculateRentalDays(rentDate, returnDate)} />
      <ColoredButton buttonText="Confirm Order" mode="light" />
    </div>
  );
};

export default Checkout;
