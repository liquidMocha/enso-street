import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Checkout from './Checkout';
import ChooseLocation from '../../shared/ChooseLocation';

const CheckoutRouter = () => {
  const CHECKOUT_PATH = '/checkout';
  const CHOOSE_LOCATION_PATH = '/checkout/choose-location';
  const [deliveryLocation, setDeliveryLocation] = useState({
    street: 'default street',
    zipCode: 'default zip',
  });

  return (
    <Switch>
      <Route exact path={CHECKOUT_PATH}>
        <Checkout
          deliveryLocation={deliveryLocation}
          chooseLocationPath={CHOOSE_LOCATION_PATH}
        />
      </Route>
      <ChooseLocation
        exitPath={CHECKOUT_PATH}
        onLocationChange={(location) => setDeliveryLocation(location)}
        path={CHOOSE_LOCATION_PATH}
      />
    </Switch>
  );
};

export default CheckoutRouter;
