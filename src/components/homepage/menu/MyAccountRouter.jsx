import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountInformation from './AccountInformation';
import BankAccount from './BankAccount';
import EditContacts from '../../cart/checkout/EditContacts';
import MyAccount from './MyAccount';
import EditContact from '../../cart/checkout/EditContact';
import { addContactAction } from '../../../redux/user/UserAction';
import ChooseLocation from '../../shared/ChooseLocation';

const MyAccountRouter = () => {
  const userProfile = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [editedContact, setEditedContact] = useState({});

  const EDIT_CONTACTS_PATH = '/manage-contacts';
  const EDIT_CONTACT_PATH = '/edit-contact';
  const MY_ACCOUNT_PATH = '/my-account';
  const ADDRESS_BOOK_PATH = '/address-book';

  return (
    <Switch>
      <Route path={MY_ACCOUNT_PATH}>
        <MyAccount
          addressBookPath={ADDRESS_BOOK_PATH}
          contactListPath={EDIT_CONTACTS_PATH}
        />
      </Route>
      <Route path="/account-information">
        <AccountInformation />
      </Route>
      <Route path="/bank-account">
        <BankAccount />
      </Route>
      <Route path={EDIT_CONTACTS_PATH}>
        <EditContacts
          contacts={userProfile.contacts}
          onEditContact={(contact) => {
            console.log('my account edit contacts');
            setEditedContact(contact);
            history.push(EDIT_CONTACT_PATH);
          }}
          onContactChange={() => {}}
        />
      </Route>
      <Route exact path={EDIT_CONTACT_PATH}>
        <EditContact
          contact={editedContact}
          onSaveContact={(contact) => {
            console.log('my account edit contact');
            dispatch(addContactAction(contact));
            history.push(EDIT_CONTACTS_PATH);
          }}
        />
      </Route>
      <ChooseLocation
        exitPath={MY_ACCOUNT_PATH}
        onLocationChange={() => {}}
        path={ADDRESS_BOOK_PATH}
      />
    </Switch>
  );
};

export default MyAccountRouter;
