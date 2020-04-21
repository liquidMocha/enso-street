import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TitleBar from '../../shared/TitleBar';
import RentalDate from './RentalDate';
import ColoredButton from '../../shared/ColoredButton';
import DeliveryOrPickupSection from './DeliveryOrPickupSection';
import CustomerInformation from './CustomerInformation';
import DeliveryContact from './DeliveryContact';
import OrderDetails from './OrderDetails';
import './Checkout.scss';
import { getDeliveryPrice } from '../../../services/TransactionService';
import OrderSummary from './OrderSummary';

function calculateItemSubtotal(selectedItems, rentalDays) {
  return selectedItems.reduce(
    (total, item) => total + item.rentalDailyPrice * item.quantity * rentalDays, 0,
  );
}

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
  const [rentalDays, setRentalDays] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const pickupOnly = useSelector((state) => state.cart.cart.pickupOnly());
  const [renterPickup, setRenterPickup] = useState(pickupOnly);
  const selectedItems = useSelector((state) => state.cart.cart.getSelectedItems());
  const [calculatingDeliveryPrice, setCalculatingDeliveryPrice] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setRentalDays(calculateRentalDays(rentDate, returnDate));
  }, [rentDate, returnDate]);

  useEffect(() => {
    setSubtotal(calculateItemSubtotal(selectedItems, rentalDays));
  }, [selectedItems, rentalDays]);

  useEffect(() => {
    if (renterPickup) {
      setDeliveryFee(0);
    } else {
      setCalculatingDeliveryPrice(true);
      getDeliveryPrice(selectedItems.map((item) => item.id), deliveryLocation)
        .then((fee) => {
          setDeliveryFee(fee);
          setCalculatingDeliveryPrice(false);
        });
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
      {pickupOnly
        ? null : (
          <DeliveryOrPickupSection
            chooseLocationPath={chooseLocationPath}
            location={deliveryLocation}
            onRenterPickupChange={() => setRenterPickup(!renterPickup)}
            renterPickup={renterPickup}
          />
        )}
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
      <OrderDetails rentalDays={rentalDays} deliveryPrice={deliveryFee} />
      <OrderSummary
        calculatingDeliveryFee={calculatingDeliveryPrice}
        deliveryFee={deliveryFee}
        subtotal={subtotal}
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
