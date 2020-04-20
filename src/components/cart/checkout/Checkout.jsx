import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import TitleBar from '../../shared/TitleBar';
import RentalDate from './RentalDate';
import ColoredButton from '../../shared/ColoredButton';
import DeliveryOrPickupSection from './DeliveryOrPickupSection';
import CustomerInformation from './CustomerInformation';
import DeliveryContact from './DeliveryContact';
import OrderDetails from './OrderDetails';
import './Checkout.scss';

function calculateRentalDays(startDateTime, endDateTime) {
  const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

  return (
    (new Date(endDateTime).getTime() - new Date(startDateTime))
    / MILLISECONDS_IN_A_DAY).toFixed();
}

function defaultReturnDate() {
  const twoDaysFromToday = new Date();
  twoDaysFromToday.setDate(new Date().getDate() + 2);
  return (twoDaysFromToday).toISOString().substr(0, 16);
}

const Checkout = ({
  deliveryLocation,
  customerInformation,
  deliveryContact,
  chooseLocationPath,
  onEditCustomerInfo,
  onEditDeliveryInfo,
}) => {
  const today = (new Date()).toISOString().substr(0, 16);
  const [rentDate, setRentDate] = useState(today);
  const [returnDate, setReturnDate] = useState(defaultReturnDate());
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [renterPickup, setRenterPickup] = useState(false);

  useEffect(() => {
    if (renterPickup) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(0);
    }
  }, [deliveryLocation, renterPickup]);

  return (
    <div className="confirm-checkout-page">
      <TitleBar />
      <RentalDate
        rentDate={rentDate}
        onRentDateChange={setRentDate}
        returnDate={returnDate}
        onReturnDateChange={setReturnDate}
      />
      <DeliveryOrPickupSection
        chooseLocationPath={chooseLocationPath}
        location={deliveryLocation}
        onRenterPickupChange={() => setRenterPickup(!renterPickup)}
        renterPickup={renterPickup}
      />
      <CustomerInformation
        value={customerInformation}
        onEdit={onEditCustomerInfo}
      />
      {renterPickup
        ? null : (
          <DeliveryContact
            value={deliveryContact}
            onEdit={onEditDeliveryInfo}
          />
        )}
      <OrderDetails
        rentalDays={calculateRentalDays(rentDate, returnDate)}
        deliveryPrice={deliveryFee}
      />
      <ColoredButton buttonText="Confirm Order" mode="light" />
    </div>
  );
};

Checkout.propTypes = {
  deliveryLocation: PropTypes.any.isRequired,
  customerInformation: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  deliveryContact: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  chooseLocationPath: PropTypes.string.isRequired,
  onEditCustomerInfo: PropTypes.func.isRequired,
  onEditDeliveryInfo: PropTypes.func.isRequired,
};

Checkout.defaultProps = {
  customerInformation: {
    name: '',
    phone: '',
    email: '',
  },
  deliveryContact: {
    name: '',
    phone: '',
    email: '',
  },
};

export default Checkout;
