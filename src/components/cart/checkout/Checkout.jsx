import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useHistory } from 'react-router-dom';
import { pluck } from 'ramda';
import TitleBar from '../../shared/TitleBar';
import RentalDate from './RentalDate';
import ColoredButton from '../../shared/ColoredButton';
import DeliveryOrPickupSection from './DeliveryOrPickupSection';
import CustomerInformation from './CustomerInformation';
import DeliveryContact from './DeliveryContact';
import OrderDetails from './OrderDetails';
import './Checkout.scss';
import { createPaymentIntent, getDeliveryPrice } from '../../../services/TransactionService';
import OrderSummary from './OrderSummary';
import { removeFromCartAction } from '../../../redux/cart/cartAction';
import { getSelectedItems, isPickupOnly } from '../../../redux/cart/Cart';

function calculateItemSubtotal(selectedItems, rentalDays) {
  let discount = 1;
  if (rentalDays >= 4 && rentalDays <= 9) {
    discount = 0.85;
  } else if (rentalDays >= 10 && rentalDays <= 20) {
    discount = 0.75;
  } else if (rentalDays > 20) {
    discount = 0.65;
  }

  return selectedItems.reduce(
    (total, item) => total + item.rentalDailyPrice * item.quantity * rentalDays, 0,
  ) * discount;
}

function calculateDeposits(selectedItems) {
  return selectedItems.reduce(
    (total, item) => total + item.deposit * item.quantity, 0,
  );
}

function calculateRentalDays(startDate, endDate) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  return Math.floor(
    (
      Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())
      - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
    )
    / (1000 * 60 * 60 * 24),
  ) + 1;
}

function defaultReturnDate() {
  const twoDaysFromToday = new Date();
  twoDaysFromToday.setDate(new Date().getDate() + 2);
  return twoDaysFromToday;
}

const Checkout = ({
  deliveryLocation,
  customerInformation,
  deliveryContact,
  chooseLocationPath,
  onEditCustomerInfo,
  onEditDeliveryInfo,
}) => {
  const today = new Date();
  const history = useHistory();
  const [rentDate, setRentDate] = useState(today);
  const [returnDate, setReturnDate] = useState(defaultReturnDate());
  const [rentalDays, setRentalDays] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const pickupOnly = useSelector((state) => isPickupOnly(state.cart.cart));
  const [renterPickup, setRenterPickup] = useState(pickupOnly);
  const selectedItems = useSelector((state) => {
    const selected = getSelectedItems(state.cart.cart);
    if (selected.length === 0) {
      history.push('/my-cart');
    }
    return selected;
  });
  const [calculatingDeliveryPrice, setCalculatingDeliveryPrice] = useState(false);
  const [deliverySameAsCustomer, setDeliverySameAsCustomer] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [confirmOrderDisabled, setConfirmOrderDisabled] = useState(true);
  const [deposits, setDeposits] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setRentalDays(calculateRentalDays(rentDate, returnDate));
  }, [rentDate, returnDate]);

  useEffect(() => {
    setSubtotal(calculateItemSubtotal(selectedItems, rentalDays));
  }, [selectedItems, rentalDays]);

  useEffect(() => {
    const calculatedDeposits = calculateDeposits(selectedItems);
    if (subtotal < calculatedDeposits) {
      setDeposits(calculatedDeposits);
    } else {
      setDeposits(0);
    }
  }, [selectedItems, subtotal]);

  useEffect(() => {
    if (renterPickup) {
      setDeliveryFee(0);
      setCalculatingDeliveryPrice(false);
    } else {
      setCalculatingDeliveryPrice(true);
      getDeliveryPrice(pluck('id', selectedItems), deliveryLocation)
        .then((fee) => {
          setDeliveryFee(fee);
          setCalculatingDeliveryPrice(false);
        });
    }
  }, [deliveryLocation, renterPickup]);

  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    if (!stripe || !elements) {
      setConfirmOrderDisabled(true);
    } else {
      setConfirmOrderDisabled(false);
    }
  }, [stripe, elements]);


  const processPayment = async () => {
    setConfirmOrderDisabled(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const stripeClientSecret = await createPaymentIntent(
      selectedItems,
      !renterPickup,
      renterPickup ? null : deliveryLocation,
      rentDate,
      returnDate,
    );

    const result = await stripe.confirmCardPayment(stripeClientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: customerInformation.name,
        },
      },
    });

    console.log('Confirm card payment result: ', result);

    if (result.error) {
      if (result.error.decline_code === 'insufficient_funds') {
        console.log('Insufficient funds');
      }
    } else {
      selectedItems.forEach((item) => {
        dispatch(removeFromCartAction(item.id, true));
      });
      history.push('/');
    }
  };

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
            onChangeSameAsCustomer={() => { setDeliverySameAsCustomer(!deliverySameAsCustomer); }}
            sameAsCustomer={deliverySameAsCustomer}
          />
        )}
      <OrderDetails rentalDays={rentalDays} deliveryPrice={deliveryFee} />
      <OrderSummary
        calculatingDeliveryFee={calculatingDeliveryPrice}
        deliveryFee={deliveryFee}
        subtotal={subtotal}
        deposits={deposits}
        renterPickup={renterPickup}
      />
      <CardElement />
      <ColoredButton
        buttonText="Confirm Order"
        mode="light"
        onClick={processPayment}
        disabled={confirmOrderDisabled}
      />
    </div>
  );
};

Checkout.propTypes = {
  deliveryLocation: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
  }),
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
  deliveryLocation: null,
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
