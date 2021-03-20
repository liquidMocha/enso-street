import { Route, Switch, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from './Checkout';
import ChooseLocation from '../../shared/ChooseLocation';
import EditContacts from './EditContacts';
import { addContactAction } from '../../../redux/user/UserAction';
import EditContact from './EditContact';
import AccountInformation from '../../homepage/menu/AccountInformation';

const CheckoutRouter = () => {
  const CHECKOUT_PATH = '/checkout';
  const CHOOSE_LOCATION_PATH = '/checkout/choose-location';
  const EDIT_CONTACTS_PATH = '/checkout/manage-contacts';
  const EDIT_CONTACT_PATH = '/checkout/edit-contact';
  const MY_PROFILE_PATH = '/my-profile';
  const defaultAddress = useSelector((state) => {
    if (state.user.defaultAddress) {
      return {
        street: state.user.defaultAddress.street,
        city: state.user.defaultAddress.city,
        state: state.user.defaultAddress.state,
        zipCode: state.user.defaultAddress.zipCode,
      };
    }
    return null;
  });

  const [deliveryLocation, setDeliveryLocation] = useState();
  const [editedContact, setEditedContact] = useState({});
  const [deliveryContact, setDeliveryContact] = useState({});
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user);
  const history = useHistory();

  const editCustomerInfo = () => {
    history.push(MY_PROFILE_PATH);
  };

  const editDeliveryContact = () => {
    history.push(EDIT_CONTACTS_PATH);
  };

  const onSaveProfile = () => {
    history.goBack();
  };

  return (
    <Switch>
      <Route exact path={MY_PROFILE_PATH}>
        <AccountInformation onSaveProfile={onSaveProfile} />
      </Route>
      <Route exact path={EDIT_CONTACT_PATH}>
        <EditContact
          contact={editedContact}
          onSaveContact={(contact) => {
            dispatch(addContactAction(contact));
            history.push(EDIT_CONTACTS_PATH);
          }}
        />
      </Route>
      <Route exact path={EDIT_CONTACTS_PATH}>
        <EditContacts
          contacts={userProfile.contacts}
          onEditContact={(contact) => {
            setEditedContact(contact);
            history.push(EDIT_CONTACT_PATH);
          }}
          onContactChange={(contact) => {
            setDeliveryContact(contact);
            history.push(CHECKOUT_PATH);
          }}
        />
      </Route>
      <Route exact path={CHECKOUT_PATH}>
        <Checkout
          deliveryLocation={deliveryLocation || defaultAddress}
          chooseLocationPath={CHOOSE_LOCATION_PATH}
          editContactPath={EDIT_CONTACTS_PATH}
          customerInformation={userProfile}
          deliveryContact={deliveryContact}
          editContactsPath={EDIT_CONTACTS_PATH}
          onEditCustomerInfo={editCustomerInfo}
          onEditDeliveryInfo={editDeliveryContact}
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
