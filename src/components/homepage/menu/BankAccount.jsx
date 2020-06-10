import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import TitleBar from '../../shared/TitleBar';
import { connectStripeUser } from '../../../services/UserService';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BankAccount = () => {
  const user = useSelector((state) => state.user);
  const query = useQuery();

  useEffect(() => {
    const stripeAuthorizationCode = query.get('code');
    if (stripeAuthorizationCode) {
      connectStripeUser(stripeAuthorizationCode);
    }
  }, []);

  // TODO: randomize the CSRF token
  return (
    <div>
      <TitleBar />
      <a href={`${STRIPE_EXPRESS_BASE_URL}?`
        + `redirect_uri=${STRIPE_REDIRECT_URI}&`
        + `client_id=${STRIPE_CLIENT_ID}&`
        + 'state=change_this_token&'
        + 'scope=read_write&'
        + 'response_type=code&'
        + 'stripe_user[business_type]=individual&'
        + `stripe_user[email]=${user.email}&`
        + 'stripe_user[country]=us&'
        + `stripe_user[phone_number]=${user.phone}&`
        + `stripe_user[first_name]=${user.firstName}&`
        + `stripe_user[last_name]=${user.lastName}&`
        + 'stripe_user[product_description]=\'some renting product\''}
      >
        Connect With Stripe
      </a>
    </div>
  );
};

export default BankAccount;
