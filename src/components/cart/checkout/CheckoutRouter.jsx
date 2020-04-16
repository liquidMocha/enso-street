import { useHistory, Route, Switch } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from './Checkout';
import ChooseLocation from '../../shared/ChooseLocation';
import EditContacts from './EditContacts';
import { addContactAction, getUserProfileAction } from '../../../redux/user/UserAction';
import EditContact from './EditContact';

const CheckoutRouter = () => {
  const CHECKOUT_PATH = '/checkout';
  const CHOOSE_LOCATION_PATH = '/checkout/choose-location';
  const EDIT_CONTACTS_PATH = '/checkout/manage-contacts';
  const EDIT_CONTACT_PATH = '/checkout/edit-contact';
  const [deliveryLocation, setDeliveryLocation] = useState({
    street: 'default street',
    zipCode: 'default zip',
  });
  const [editedContact, setEditedContact] = useState({});
  const [customerInformation, setCustomerInformation] = useState({});
  const [deliveryContact, setDeliveryContact] = useState({});
  const [editingCustomerInfo, setEditingCustomerInfo] = useState(false);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, []);

  const editCustomerInfo = () => {
    setEditingCustomerInfo(true);
    history.push(EDIT_CONTACTS_PATH);
  };

  const editDeliveryContact = () => {
    setEditingCustomerInfo(false);
    history.push(EDIT_CONTACTS_PATH);
  };

  return (
    <Switch>
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
          contacts={userProfile.profile.contacts}
          onEditContact={(contact) => {
            setEditedContact(contact);
            history.push(EDIT_CONTACT_PATH);
          }}
          onContactChange={(contact) => {
            if (editingCustomerInfo) {
              setCustomerInformation(contact);
            } else {
              setDeliveryContact(contact);
            }
            history.push(CHECKOUT_PATH);
          }}
        />
      </Route>
      <Route exact path={CHECKOUT_PATH}>
        <Checkout
          deliveryLocation={deliveryLocation}
          chooseLocationPath={CHOOSE_LOCATION_PATH}
          editContactPath={EDIT_CONTACTS_PATH}
          customerInformation={customerInformation}
          deliveryContact={deliveryContact}
          editContactsPath={EDIT_CONTACTS_PATH}
          onEditCustomerInfo={() => editCustomerInfo()}
          onEditDeliveryInfo={() => editDeliveryContact()}
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
